const Citizen = require("../models/Citizen");
const Officer = require("../models/Officer");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/nodemailer");

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

exports.citizenSignup = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    let citizen = await Citizen.findOne({ email });

    if (citizen && citizen.isVerified) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = generateOtp();
    const otpExpire = Date.now() + 5 * 60 * 1000;

    if (!citizen) {
      citizen = await Citizen.create({
        fullName,
        email,
        phone,
        password,
        otp,
        otpExpire,
      });
    } else {
      citizen.password = password;
      citizen.otp = otp;
      citizen.otpExpire = otpExpire;
      await citizen.save();
    }

    await sendMail("sendOtp", { email, otp });
    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyCitizenOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const citizen = await Citizen.findOne({ email });

    if (!citizen || citizen.otp !== otp || citizen.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    citizen.isVerified = true;
    citizen.otp = null;
    citizen.otpExpire = null;
    await citizen.save();

    res.json({
      token: signToken(citizen),
      role: citizen.role,
      user: citizen,
    });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};

exports.verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await Citizen.findOne({ email });

    if (
      !user ||
      user.otp !== otp ||
      !user.otpExpire ||
      user.otpExpire < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    res.json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify reset OTP error:", error);
    res.status(500).json({
      message: "OTP verification failed",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user =
      (await Citizen.findOne({ email }).select("+password")) ||
      (await Officer.findOne({ email }).select("+password")) ||
      (await Admin.findOne({ email }).select("+password"));

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "citizen" && !user.isVerified)
      return res.status(401).json({ message: "Not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ token: signToken(user), role: user.role, user });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Citizen.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendMail("sendOtp", { email, otp });
    res.json({ message: "OTP sent" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await Citizen.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
