const express = require("express");
const controller = require("../controllers/departmentController");

const router = express.Router();

router.get("/zone-status", controller.getWaterZoneStatus);

module.exports = router;

