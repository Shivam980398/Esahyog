const Officer = require("../models/Officer");
const Complaint = require("../models/Complaint");
const Citizen = require("../models/Citizen");

exports.createOfficer = async (req, res) => {
  try {
    const newOfficer = await Officer.create(req.body);
    res
      .status(201)
      .json({ message: "Officer registered to department", newOfficer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getGlobalStats = async (req, res) => {
  try {
    const summary = await Complaint.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const prioritySummary = await Complaint.aggregate([
      {
        $group: {
          _id: "$priority",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const fiveDaysAgo = new Date();

    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const activeStatuses = [
      "Pending",
      "Accepted",
      "Scheduled",
      "On the Way",
      "Inter-Dept Forwarded",
    ];

    const overdue = await Complaint.find({
      createdAt: {
        $lte: fiveDaysAgo,
      },

      status: {
        $in: activeStatuses,
      },
    })
      .populate("assignedOfficer", "fullName email department")
      .populate("citizen", "fullName")
      .sort({
        createdAt: 1,
      });

    const activeServices = await Complaint.countDocuments({
      status: {
        $in: ["Accepted", "Scheduled", "On the Way", "Inter-Dept Forwarded"],
      },
    });

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });
    const critical = await Complaint.countDocuments({
      priority: "critical",

      status: {
        $in: activeStatuses,
      },
    });

    return res.status(200).json({
      success: true,

      summary,

      prioritySummary,

      overdue,

      overdueCount: overdue.length,

      activeServices,

      pending,

      resolved,

      critical,
    });
  } catch (err) {
    console.error("Admin global stats error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("citizen assignedOfficer")
      .sort("-createdAt");
    res.json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOfficers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.department) {
      filter.department = req.query.department;
    }

    const officers = await Officer.find(filter)
      .select(
        "fullName email phone department isAvailable pendingCount resolvedCount",
      )
      .sort({ department: 1, fullName: 1 });

    return res.status(200).json({
      success: true,
      data: officers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.assignComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { officerId } = req.body;

    if (!officerId) {
      return res.status(400).json({
        success: false,
        message: "Officer ID is required",
      });
    }

    const [complaint, officer] = await Promise.all([
      Complaint.findById(id),
      Officer.findById(officerId),
    ]);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (!officer) {
      return res.status(404).json({
        success: false,
        message: "Officer not found",
      });
    }

    if (complaint.assignedOfficer) {
      return res.status(409).json({
        success: false,
        message: "This complaint is already assigned to an officer",
      });
    }

    if (officer.department !== complaint.department) {
      return res.status(400).json({
        success: false,
        message: "Officer must belong to the complaint department",
      });
    }

    complaint.assignedOfficer = officer._id;

    await complaint.save();

    await Officer.findByIdAndUpdate(officer._id, {
      $addToSet: {
        complaintsAssigned: complaint._id,
      },
      $inc: {
        pendingCount: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Complaint assigned successfully",
      data: await Complaint.findById(complaint._id).populate(
        "citizen assignedOfficer",
      ),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.updateComplaintPriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const allowed = ["low", "medium", "high", "critical"];

    if (!allowed.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { priority },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint priority updated successfully",
      data: complaint,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = [
      "Pending",
      "Accepted",
      "Scheduled",
      "On the Way",
      "Inter-Dept Forwarded",
      "Resolved",
      "Rejected",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid complaint status",
      });
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    const previousStatus = complaint.status;

    complaint.status = status;

    await complaint.save();

    if (complaint.assignedOfficer && previousStatus !== status) {
      if (status === "Resolved" && previousStatus !== "Resolved") {
        await Officer.findByIdAndUpdate(complaint.assignedOfficer, {
          $pull: {
            complaintsAssigned: complaint._id,
          },
          $inc: {
            resolvedCount: 1,
            pendingCount: -1,
          },
        });
      }

      if (previousStatus === "Resolved" && status !== "Resolved") {
        await Officer.findByIdAndUpdate(complaint.assignedOfficer, {
          $addToSet: {
            complaintsAssigned: complaint._id,
          },
          $inc: {
            resolvedCount: -1,
            pendingCount: 1,
          },
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      data: complaint,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
