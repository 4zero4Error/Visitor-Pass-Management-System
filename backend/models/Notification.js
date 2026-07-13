const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: String,

  message: String,

  type: {
    type: String,
    enum: ["Email", "SMS", "System"],
  },

  status: {
    type: String,
    enum: ["Pending", "Sent", "Failed"],
    default: "Pending",
  },

  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
