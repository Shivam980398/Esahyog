const Emergency = require("../models/Emergency");

exports.createEmergency = async (req, res) => {
  try {
    const { type, location, details } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Emergency type is required",
      });
    }

    if (!location?.address?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Emergency location is required",
      });
    }

    if (!details?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Emergency details are required",
      });
    }

    const emergency = await Emergency.create({
      citizen: req.user.id,
      type,
      location: {
        address: location.address.trim(),
        coordinates: location.coordinates || {},
      },
      details: details.trim(),
      priority: "critical",
      status: "open",
    });

    res.status(201).json({
      success: true,
      message: "Emergency report submitted successfully",
      data: emergency,
    });
  } catch (err) {
    console.error("Create emergency error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to create emergency report",
    });
  }
};

exports.getMyEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({
      citizen: req.user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: emergencies,
    });
  } catch (err) {
    console.error("Get my emergencies error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency history",
    });
  }
};

exports.getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate("citizen", "fullName email phone")
      .sort({ createdAt: -1 })
      .lean();

    const data = emergencies.map((emergency) => ({
      id: emergency._id,
      type: emergency.type,
      location: emergency.location?.address || "Unknown",
      coordinates: emergency.location?.coordinates || null,
      details: emergency.details,
      priority: emergency.priority,
      status: emergency.status,
      reportedAt: emergency.createdAt,
      resolvedAt: emergency.resolvedAt || null,
      citizen: emergency.citizen,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Get emergencies error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch emergencies",
    });
  }
};

exports.updateEmergencyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["open", "responding", "resolved"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid emergency status",
      });
    }

    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    emergency.status = status;

    if (status === "resolved") {
      emergency.resolvedAt = new Date();
    } else {
      emergency.resolvedAt = null;
    }

    await emergency.save();

    res.json({
      success: true,
      message: "Emergency status updated successfully",
      data: emergency,
    });
  } catch (err) {
    console.error("Update emergency status error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to update emergency status",
    });
  }
};
