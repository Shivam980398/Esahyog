const { departments, waterZoneStatus } = require("../data/departments");

exports.getDepartments = (req, res) => {
  res.json({ success: true, data: departments });
};

exports.getDepartmentDashboard = (req, res) => {
  const department = departments.find((item) => item.key === req.params.key);

  if (!department) {
    return res.status(404).json({ message: "Department not found" });
  }

  res.json({ success: true, data: department });
};

exports.getWaterZoneStatus = (req, res) => {
  res.json(waterZoneStatus);
};

