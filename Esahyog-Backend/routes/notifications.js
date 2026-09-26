const express = require("express");

const {
  getMyNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} = require("../controllers/notification");

const auth = require("../middleware/auth");

const router = express.Router();

// Get all notifications for the logged-in user
router.get("/", auth, getMyNotifications);

// Get unread notification count
router.get("/unread-count", auth, getUnreadNotificationCount);

router.patch("/mark-all-read", auth, markAllNotificationsAsRead);

// Mark one notification as read
router.patch("/:notificationId/read", auth, markNotificationAsRead);

// Delete one notification
router.delete("/:notificationId", auth, deleteNotification);

module.exports = router;
