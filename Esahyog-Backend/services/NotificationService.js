const Notification = require("../models/Notification");

const createNotification = async ({
  recipient,
  recipientModel,
  type,
  title,
  message,
  complaint = null,
  metadata = {},
}) => {
  if (!recipient || !recipientModel || !type || !title || !message) {
    throw new Error("Missing required notification fields");
  }

  const notification = await Notification.create({
    recipient,
    recipientModel,
    type,
    title,
    message,
    complaint,
    metadata,
  });

  return notification;
};

const createBulkNotifications = async (notifications) => {
  if (!Array.isArray(notifications) || notifications.length === 0) {
    return [];
  }

  return Notification.insertMany(notifications);
};

module.exports = {
  createNotification,
  createBulkNotifications,
};
