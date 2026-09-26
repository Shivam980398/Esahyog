const express = require("express");
const controller = require("../controllers/departmentController");

const router = express.Router();

router.get("/", controller.getDepartments);
router.get("/water/zone-status", controller.getWaterZoneStatus);
router.get("/:key/dashboard", controller.getDepartmentDashboard);

module.exports = router;

