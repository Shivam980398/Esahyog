const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "recipientModel",
      index: true,
    },

    recipientModel: {
      type: String,
      required: true,
      enum: ["Citizen", "Officer", "Admin"],
    },

    type: {
      type: String,
      required: true,
      enum: [
        "COMPLAINT_SUBMITTED",
        "COMPLAINT_ASSIGNED",
        "COMPLAINT_STATUS_CHANGED",
        "COMPLAINT_RESOLVED",
        "COMPLAINT_REOPENED",
        "OTP_SENT",
        "OTP_EXPIRED",
        "ADMIN_ANNOUNCEMENT",
      ],
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      default: null,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({
  recipient: 1,
  isRead: 1,
  createdAt: -1,
});

notificationSchema.index({
  recipient: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Notification", notificationSchema);
