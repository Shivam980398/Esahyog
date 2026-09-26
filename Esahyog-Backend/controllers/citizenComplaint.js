const Complaint = require("../models/Complaint");
const Citizen = require("../models/Citizen");
const { createNotification } = require("../services/NotificationService");

exports.createComplaint = async (req, res) => {
  try {
    const newComplaint = new Complaint({
      ...req.body,
      citizen: req.user.id,
    });

    const saved = await newComplaint.save();

    // Update the citizen's complaint history
    await Citizen.findByIdAndUpdate(req.user.id, {
      $push: {
        complaints: saved._id,
      },
    });

    // Create a notification for the citizen
    try {
      await createNotification({
        recipient: req.user.id,
        recipientModel: "Citizen",
        type: "COMPLAINT_SUBMITTED",
        title: "Complaint Submitted Successfully",
        message: `Your complaint "${saved.title}" has been submitted successfully.`,
        complaint: saved._id,
        metadata: {
          complaintId: saved._id,
          department: saved.department,
          status: saved.status,
        },
      });
    } catch (notificationError) {
      // Do not fail complaint submission if notification creation fails
      console.error("Notification creation failed:", notificationError.message);
    }

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      data: saved,
    });
  } catch (err) {
    console.error("Create complaint error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const { status, department } = req.query;
    let query = { citizen: req.user.id };

    if (status) query.status = status;
    if (department) query.department = department;

    const complaints = await Complaint.find(query)
      .populate("assignedOfficer", "fullName phone")
      .sort("-createdAt");

    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("assignedOfficer", "fullName phone department")
      .populate("citizen", "fullName email phone");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (
      req.user.role === "citizen" &&
      complaint.citizen._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this complaint",
      });
    }

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (err) {
    console.error("Get complaint by ID error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.withdrawComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (complaint.citizen.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to withdraw this complaint",
      });
    }

    if (complaint.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending complaints can be taken back",
      });
    }

    complaint.status = "Withdrawn";

    complaint.updates.push({
      status: "Withdrawn",
      remark: "Complaint withdrawn by citizen",
      timestamp: new Date(),
    });

    await complaint.save();

    return res.status(200).json({
      success: true,
      message: "Complaint taken back successfully",
      data: complaint,
    });
  } catch (err) {
    console.error("Withdraw complaint error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
