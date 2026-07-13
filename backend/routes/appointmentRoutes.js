const express = require('express');
const { createAppointment, getMyAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { auth, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createAppointment);
router.get('/', auth, getMyAppointments);
router.patch('/:id/status', auth, authorizeRoles('Admin', 'Employee'), updateAppointmentStatus);

module.exports = router;
