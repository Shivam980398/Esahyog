const Citizen = require("../models/Citizen");

exports.updateProfile = async (req, res) => {
  try {
    const { username, dob } = req.body;

    const citizen = await Citizen.findById(req.user.id);
    if (!citizen) {
      return res.status(404).json({ message: "Citizen not found" });
    }

    citizen.username = username;
    citizen.dob = dob;

    if (req.file) {
      citizen.profileImage = req.file.path;
    }

    await citizen.save();

    res.json({
      success: true,
      message: "Profile updated",
      user: citizen,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateIdentity = async (req, res) => {
  try {
    const {
      idType,
      idNumber,
      address,
      wardNo,
      area,
      district,
      state,
      pincode,
    } = req.body;

    const citizen = await Citizen.findById(req.user.id);
    if (!citizen) {
      return res.status(404).json({ message: "Citizen not found" });
    }

    citizen.idType = idType;
    citizen.idNumber = idNumber;
    citizen.address = address;
    citizen.wardNo = wardNo;
    citizen.area = area;
    citizen.district = district;
    citizen.state = state;
    citizen.pincode = pincode;

    await citizen.save();

    res.json({
      success: true,
      message: "Identity details saved",
      user: citizen,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
