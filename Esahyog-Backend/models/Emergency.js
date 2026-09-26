const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["fire", "crime", "medical", "utility"],
      required: true,
    },

    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    details: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: ["critical", "high", "medium"],
      default: "critical",
    },

    status: {
      type: String,
      enum: ["open", "responding", "resolved"],
      default: "open",
      index: true,
    },

    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Emergency", emergencySchema);
