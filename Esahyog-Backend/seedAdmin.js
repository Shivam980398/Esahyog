// scripts/createAdmin.js
const mongoose = require("mongoose");
const Admin = require("./models/Admin"); // Ensure path is correct
require("dotenv").config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    const adminData = {
      fullName: "System Administrator",
      email: "admin@smartcity.com",
      password: "Admin@123Secure",
      role: "admin",
    };

    const existing = await Admin.findOne({ email: adminData.email });
    if (existing) return console.log("Admin already exists!");

    await Admin.create(adminData);
    console.log(
      " Admin created successfully. You can now login at /api/auth/login",
    );
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
