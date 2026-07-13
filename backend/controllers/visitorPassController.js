const VisitorPass = require('../models/VisitorPass');
const Appointment = require('../models/Appointment');
const CheckIn = require('../models/CheckIn');
const CheckOut = require('../models/CheckOut');

const generatePassNumber = () => {
  return `VP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

const createVisitorPass = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const alreadyIssued = await VisitorPass.findOne({ appointment: appointmentId });
    if (alreadyIssued) {
      return res.status(400).json({ message: 'A pass has already been issued for this appointment' });
    }

    const passNumber = generatePassNumber();

    const pass = new VisitorPass({
      appointment: appointmentId,
      visitor: appointment.visitor,
      host: appointment.host,
      passNumber,
      validFrom: new Date(),
      validTill: new Date(Date.now() + 24 * 60 * 60 * 1000),
      issuedBy: req.user._id,
      // This text can be used with any QR scanner package later.
      qrCode: passNumber
    });

    await pass.save();
    await pass.populate('visitor host appointment issuedBy', 'fullName email purpose');

    res.status(201).json(pass);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getVisitorPasses = async (req, res) => {
  try {
    let passes;
    
    if (req.user.role === 'Visitor') {
      passes = await VisitorPass.find({ visitor: req.user._id })
        .populate('visitor host appointment', 'fullName email purpose');
    } else if (req.user.role === 'Employee') {
      passes = await VisitorPass.find({ host: req.user._id })
        .populate('visitor host appointment', 'fullName email purpose');
    } else {
      passes = await VisitorPass.find()
        .populate('visitor host appointment', 'fullName email purpose');
    }

    res.json(passes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyPass = async (req, res) => {
  try {
    const pass = await VisitorPass.findOne({ passNumber: req.params.passNumber })
      .populate('visitor host appointment', 'fullName email purpose meetingLocation');

    if (!pass) {
      return res.status(404).json({ message: 'Pass not found' });
    }

    if (pass.validTill && pass.validTill < new Date() && pass.status === 'Issued') {
      pass.status = 'Expired';
      await pass.save();
    }

    res.json(pass);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const checkIn = async (req, res) => {
  try {
    const { passId, gate, remarks } = req.body;

    const pass = await VisitorPass.findById(passId);
    if (!pass) {
      return res.status(404).json({ message: 'Pass not found' });
    }

    if (pass.status === 'Checked-Out' || pass.status === 'Expired') {
      return res.status(400).json({ message: 'Pass cannot be checked in' });
    }

    const checkIn = new CheckIn({
      pass: passId,
      visitor: pass.visitor,
      host: pass.host,
      securityOfficer: req.user._id,
      gate,
      remarks
    });

    await checkIn.save();
    
    pass.status = 'Checked-In';
    await pass.save();

    await checkIn.populate('pass visitor host securityOfficer', 'fullName passNumber');

    res.status(201).json(checkIn);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const checkOut = async (req, res) => {
  try {
    const { passId, gate, remarks } = req.body;

    const pass = await VisitorPass.findById(passId);
    if (!pass) {
      return res.status(404).json({ message: 'Pass not found' });
    }

    if (pass.status !== 'Checked-In') {
      return res.status(400).json({ message: 'Pass is not checked in' });
    }

    const checkOut = new CheckOut({
      pass: passId,
      visitor: pass.visitor,
      host: pass.host,
      securityOfficer: req.user._id,
      gate,
      remarks
    });

    await checkOut.save();
    
    pass.status = 'Checked-Out';
    await pass.save();

    await checkOut.populate('pass visitor host securityOfficer', 'fullName passNumber');

    res.status(201).json(checkOut);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createVisitorPass, getVisitorPasses, verifyPass, checkIn, checkOut };
