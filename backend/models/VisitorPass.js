const mongoose = require('mongoose');

const visitorPassSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
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

  passNumber: {
    type: String,
    unique: true,
  },

  qrCode: String,

  pdfBadge: String,

  validFrom: Date,

  validTill: Date,

  status: {
    type: String,
    enum: ["Issued", "Checked-In", "Checked-Out", "Expired"],
    default: "Issued",
  },

  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model("VisitorPass", visitorPassSchema);
