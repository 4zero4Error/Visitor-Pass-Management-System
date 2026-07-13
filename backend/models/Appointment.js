const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  purpose: {
    type: String,
    required: true,
  },

  meetingLocation: String,

  meetingDate: {
    type: Date,
    required: true,
  },

  expectedArrival: Date,

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    default: "Pending",
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  remarks: String,
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
