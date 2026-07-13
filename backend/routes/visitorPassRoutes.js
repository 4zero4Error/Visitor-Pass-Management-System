const express = require('express');
const { createVisitorPass, getVisitorPasses, verifyPass, checkIn, checkOut } = require('../controllers/visitorPassController');
const { auth, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, authorizeRoles('Admin', 'Security'), createVisitorPass);
router.get('/verify/:passNumber', verifyPass);
router.get('/', auth, getVisitorPasses);
router.post('/checkin', auth, authorizeRoles('Admin', 'Security'), checkIn);
router.post('/checkout', auth, authorizeRoles('Admin', 'Security'), checkOut);

module.exports = router;
