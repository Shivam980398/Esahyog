const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/signup", authController.citizenSignup);
router.post("/verify-otp", authController.verifyCitizenOtp);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/verify-reset-otp", authController.verifyResetOtp);

module.exports = router;
