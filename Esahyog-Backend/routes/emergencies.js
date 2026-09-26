const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");

const {
  createEmergency,
  getMyEmergencies,
  getAllEmergencies,
  updateEmergencyStatus,
} = require("../controllers/Emergency");

// Citizen
router.post("/create", auth, checkRole("citizen"), createEmergency);

router.get("/my", auth, checkRole("citizen"), getMyEmergencies);

// Admin
router.get("/admin/all", auth, checkRole("admin"), getAllEmergencies);

router.patch(
  "/admin/:id/status",
  auth,
  checkRole("admin"),
  updateEmergencyStatus,
);

module.exports = router;
