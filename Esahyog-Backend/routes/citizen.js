const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const upload = require("../middleware/upload");

const controller = require("../controllers/citizen");

router.put(
  "/profile",
  auth,
  role("citizen"),
  upload.single("profileImage"),
  controller.updateProfile
);

router.put("/identity", auth, role("citizen"), controller.updateIdentity);

module.exports = router;
