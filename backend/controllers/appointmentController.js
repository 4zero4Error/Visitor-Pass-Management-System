const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  try {
    const { host, purpose, meetingLocation, meetingDate, expectedArrival } = req.body;

    const appointment = new Appointment({
      visitor: req.user._id,
      host,
      purpose,
      meetingLocation,
      meetingDate,
      expectedArrival
    });

    await appointment.save();
    await appointment.populate('visitor host', 'fullName email');

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    let appointments;
    
    if (req.user.role === 'Admin' || req.user.role === 'Security') {
      appointments = await Appointment.find().populate('visitor host', 'fullName email');
    } else if (req.user.role === 'Employee') {
      appointments = await Appointment.find({
        $or: [{ visitor: req.user._id }, { host: req.user._id }]
      }).populate('visitor host', 'fullName email');
    } else {
      appointments = await Appointment.find({ visitor: req.user._id })
        .populate('visitor host', 'fullName email');
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (!['Approved', 'Rejected', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (req.user.role === 'Employee' && appointment.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update your own appointments' });
    }

    appointment.status = status;
    appointment.approvedBy = req.user._id;
    appointment.remarks = remarks;

    await appointment.save();
    await appointment.populate('visitor host approvedBy', 'fullName email');

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAppointment, getMyAppointments, updateAppointmentStatus };
