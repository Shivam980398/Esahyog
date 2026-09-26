const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");


const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  withdrawComplaint,
} = require("../controllers/citizenComplaint");


const { updateWorkflow } = require("../controllers/officerController");


const {
  getGlobalStats,
  createOfficer,
  getOfficers,
  assignComplaint,
  updateComplaintPriority,
  updateComplaintStatus,
  getAllComplaints,
} = require("../controllers/adminController");



// Create complaint
router.post("/create", auth, checkRole("citizen"), createComplaint);

// Get logged-in citizen complaints
router.get("/my-complaints", auth, checkRole("citizen"), getMyComplaints);

// Withdraw complaint
router.patch("/withdraw/:id", auth, checkRole("citizen"), withdrawComplaint);


// Officer updates complaint workflow/status
router.patch(
  "/update-status/:complaintId",
  auth,
  checkRole("officer"),
  updateWorkflow,
);



// Admin statistics
router.get("/admin/stats", auth, checkRole("admin"), getGlobalStats);

// Admin gets all complaints
router.get("/admin/all", auth, checkRole("admin"), getAllComplaints);

// Admin gets officers
router.get("/admin/officers", auth, checkRole("admin"), getOfficers);

// Admin creates officer
router.post("/admin/add-officer", auth, checkRole("admin"), createOfficer);

// Admin assigns an unassigned complaint
router.patch("/admin/:id/assign", auth, checkRole("admin"), assignComplaint);

// Admin changes complaint priority
router.patch(
  "/admin/:id/priority",
  auth,
  checkRole("admin"),
  updateComplaintPriority,
);

// Admin changes complaint status
router.patch(
  "/admin/:id/status",
  auth,
  checkRole("admin"),
  updateComplaintStatus,
);

router.get("/:id", auth, getComplaintById);

module.exports = router;
