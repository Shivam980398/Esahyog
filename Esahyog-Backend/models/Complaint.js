const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    phone: {
      type: String,
      trim: true,
    },

    incidentDate: {
      type: Date,
    },

    department: {
      type: String,
      enum: [
        "Water",
        "Electricity",
        "Police",
        "Fire",
        "Garbage",
        "PWD",
        "Sewer",
        "Traffic",
      ],
      required: true,
    },
    location: {
      address: String,
      coordinates: { lat: Number, lng: Number },
    },
    images: [String],

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
      index: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Scheduled",
        "On the Way",
        "Inter-Dept Forwarded",
        "Resolved",
        "Rejected",
        "Withdrawn",
      ],
      default: "Pending",
    },

    assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: "Officer" },
    scheduledAt: Date,

    isStuck: { type: Boolean, default: false },
    needsActionByAdmin: { type: Boolean, default: false },

    paymentRequired: { type: Boolean, default: false },
    amount: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["None", "Pending", "Paid"],
      default: "None",
    },

    updates: [
      {
        status: String,
        remark: String,
        officer: { type: mongoose.Schema.Types.ObjectId, ref: "Officer" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Complaint", complaintSchema);
