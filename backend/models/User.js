const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: String,

  role: {
    type: String,
    enum: ["Admin", "Security", "Employee", "Visitor"],
    required: true,
  },

  department: String, // Employee/Admin only

  designation: String, // Employee/Admin only

  profilePhoto: String,

  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);