const mongoose = require('mongoose');

const visitorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  company: String,

  address: String,

  idProofType: {
    type: String,
    enum: ["Aadhar", "PAN", "Passport", "Driving License", "Other"],
  },

  idProofNumber: String,

  emergencyContact: String,

  photo: String,
}, { timestamps: true });

module.exports = mongoose.model("VisitorProfile", visitorProfileSchema);
