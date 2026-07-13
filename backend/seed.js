require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Appointment = require('./models/Appointment');

async function addUser(data) {
  let user = await User.findOne({ email: data.email });

  if (!user) {
    user = await User.create({
      ...data,
      password: await bcrypt.hash('password123', 10)
    });
  }

  return user;
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = await addUser({
      fullName: 'Admin User', email: 'admin@example.com', role: 'Admin', phone: '9999999999'
    });
    const employee = await addUser({
      fullName: 'Riya Sharma', email: 'riya@example.com', role: 'Employee', department: 'HR'
    });
    const visitor = await addUser({
      fullName: 'Aman Verma', email: 'aman@example.com', role: 'Visitor', phone: '9876543210'
    });

    const oldAppointment = await Appointment.findOne({ visitor: visitor._id, host: employee._id });
    if (!oldAppointment) {
      await Appointment.create({
        visitor: visitor._id,
        host: employee._id,
        purpose: 'Interview discussion',
        meetingLocation: 'Meeting Room 1',
        meetingDate: new Date(Date.now() + 86400000),
        status: 'Approved',
        approvedBy: admin._id
      });
    }

    console.log('Demo data added. Password for all demo users: password123');
    await mongoose.disconnect();
  } catch (error) {
    console.log('Seed error:', error.message);
    await mongoose.disconnect();
  }
}

seedDatabase();
