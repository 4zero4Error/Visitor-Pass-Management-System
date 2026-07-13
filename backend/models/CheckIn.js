const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema(
  {
    pass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VisitorPass",
      required: true,
    },

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

    securityOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    checkInTime: {
      type: Date,
      default: Date.now,
    },

    gate: {
      type: String,
      default: "Main Gate",
    },

    qrVerified: {
      type: Boolean,
      default: true,
    },

    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckIn", checkInSchema);
