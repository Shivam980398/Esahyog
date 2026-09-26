const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const {
  escalateOverdueComplaints,
} = require("./services/ComplaintEscalationService");

dotenv.config();

const dbConnect = require("./config/database");
dbConnect();

setTimeout(() => {
  escalateOverdueComplaints();
}, 5000);

setInterval(
  () => {
    escalateOverdueComplaints();
  },
  60 * 60 * 1000,
);

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  if (
    process.env.NODE_ENV === "production" &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://financialadvisorysystem.netlify.app",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads")),
);

const authRoutes = require("./routes/auth");
const citizenRoutes = require("./routes/citizen");
const complaintRoutes = require("./routes/complaintRoutes");
const departmentRoutes = require("./routes/departments");
const waterRoutes = require("./routes/water");
const notificationRoutes = require("./routes/notifications");
const emergencyRoutes = require("./routes/emergencies");

app.use("/api/auth", authRoutes);
app.use("/api/citizen", citizenRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/emergencies", emergencyRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Esahyog Backend API is running securely! </h1>");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
