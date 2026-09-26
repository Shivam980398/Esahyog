const Complaint = require("../models/Complaint");
const Officer = require("../models/Officer");

const { createNotification } = require("../services/NotificationService");

exports.updateWorkflow = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const { status, remark, scheduleDate, needsInterDept, paymentAmt } =
      req.body;

    const officerId = req.user.id;

    const officer = await Officer.findById(officerId);

    if (!officer) {
      return res.status(404).json({
        success: false,
        message: "Officer not found",
      });
    }

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (
      officer.department?.trim().toLowerCase() !==
      complaint.department?.trim().toLowerCase()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to handle complaints from this department",
      });
    }

    let newlyAssigned = false;

    if (!complaint.assignedOfficer) {
      complaint.assignedOfficer = officerId;
      newlyAssigned = true;

      await Officer.findByIdAndUpdate(officerId, {
        $addToSet: {
          complaintsAssigned: complaint._id,
        },
        $inc: {
          pendingCount: 1,
        },
      });
    } else if (complaint.assignedOfficer.toString() !== officerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "This complaint is already assigned to another officer",
      });
    }

    const previousStatus = complaint.status;

    let nextStatus = complaint.status;

    if (needsInterDept) {
      nextStatus = "Inter-Dept Forwarded";
      complaint.needsActionByAdmin = true;
    } else if (status) {
      nextStatus = status;
    }

    if (scheduleDate) {
      const parsedScheduleDate = new Date(scheduleDate);

      if (Number.isNaN(parsedScheduleDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid schedule date",
        });
      }

      complaint.scheduledAt = parsedScheduleDate;
    }

    if (
      nextStatus === "Scheduled" &&
      previousStatus !== "Scheduled" &&
      !scheduleDate &&
      !complaint.scheduledAt
    ) {
      return res.status(400).json({
        success: false,
        message: "Schedule date is required when status is Scheduled",
      });
    }

    complaint.status = nextStatus;

    if (paymentAmt !== undefined && paymentAmt !== null) {
      complaint.paymentRequired = true;
      complaint.amount = paymentAmt;
      complaint.paymentStatus = "Pending";
    }

    complaint.updates.push({
      status: complaint.status,
      remark: remark || "",
      officer: officerId,
      timestamp: new Date(),
    });

    if (previousStatus !== "Resolved" && complaint.status === "Resolved") {
      await Officer.findByIdAndUpdate(officerId, {
        $pull: {
          complaintsAssigned: complaint._id,
        },
        $inc: {
          resolvedCount: 1,
          pendingCount: -1,
        },
      });
    }

    await complaint.save();

    if (previousStatus !== complaint.status) {
      try {
        const isResolved = complaint.status === "Resolved";

        await createNotification({
          recipient: complaint.citizen,
          recipientModel: "Citizen",

          type: isResolved ? "COMPLAINT_RESOLVED" : "COMPLAINT_STATUS_CHANGED",

          title: isResolved ? "Complaint Resolved" : "Complaint Status Updated",

          message: isResolved
            ? `Your complaint "${complaint.title}" has been resolved successfully.`
            : `Your complaint "${complaint.title}" is now ${complaint.status}.`,

          complaint: complaint._id,

          metadata: {
            complaintId: complaint._id.toString(),
            previousStatus,
            newStatus: complaint.status,
            department: complaint.department,
            remark: remark || "",
          },
        });
      } catch (notificationError) {
        console.error(
          "Citizen status notification failed:",
          notificationError.message,
        );
      }
    }

    if (newlyAssigned) {
      try {
        await createNotification({
          recipient: officerId,
          recipientModel: "Officer",
          type: "COMPLAINT_ASSIGNED",
          title: "New Complaint Assigned",
          message: `A new ${complaint.department} complaint has been assigned to you.`,
          complaint: complaint._id,
          metadata: {
            complaintId: complaint._id.toString(),
            department: complaint.department,
            assignedBy: "System",
          },
        });
      } catch (notificationError) {
        console.error(
          "Officer assignment notification failed:",
          notificationError.message,
        );
      }
    }

    let responseMessage = "Complaint workflow updated successfully";

    if (newlyAssigned) {
      responseMessage = "Complaint assigned and workflow updated successfully";
    }

    if (previousStatus !== "Resolved" && complaint.status === "Resolved") {
      responseMessage = "Complaint marked as resolved successfully";
    }

    return res.status(200).json({
      success: true,
      message: responseMessage,
      data: complaint,
    });
  } catch (error) {
    console.error("Update workflow error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update complaint workflow",
      error: error.message,
    });
  }
};
