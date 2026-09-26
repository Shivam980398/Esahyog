const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const officerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    role: { type: String, default: "officer" },
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

    complaintsAssigned: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
    ],

    resolvedCount: { type: Number, default: 0 },
    pendingCount: { type: Number, default: 0 },

    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

officerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Officer", officerSchema);
