const express = require('express');
const router = express.Router();
const { register, login, adminSignup, adminLogin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);

module.exports = router;
