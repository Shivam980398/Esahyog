const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const citizenSchema = new mongoose.Schema(
  {
    fullName: String,

    email: {
      type: String,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      select: false,
    },

    otp: String,
    otpExpire: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "citizen",
    },

    username: String,
    dob: Date,
    profileImage: String,

    idType: {
      type: String,
      enum: ["Passport", "Aadhaar", "Driving License", "Voter ID"],
    },
    idNumber: String,

    address: String,
    wardNo: String,
    area: String,
    district: String,
    state: String,
    country: {
      type: String,
      default: "India",
    },
    pincode: String,
    complaints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
      },
    ],
  },
  { timestamps: true }
);

citizenSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Citizen", citizenSchema);
