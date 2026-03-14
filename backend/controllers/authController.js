const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const devStore = require('../devAuthStore');

const jwtSecret = process.env.JWT_SECRET || 'change-this-secret';
const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE || 'ADMIN2026'; // Secret code required for admin signup

const useDevStore = () => mongoose.connection.readyState !== 1;

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    if (useDevStore()) {
      const existing = await devStore.findByEmail(email);
      if (existing) return res.status(400).json({ message: 'Email already registered (dev)' });
      const user = await devStore.createUser({ name, email, password });
      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
      return res.json({ token, user });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Auth register error:', err);
    const message = process.env.NODE_ENV === 'development' ? err.message : 'Server error';
    res.status(500).json({ message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    if (useDevStore()) {
      const user = await devStore.findByEmail(email);
      if (!user) return res.status(400).json({ message: 'Invalid credentials (dev)' });
      const isMatch = await devStore.comparePassword(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials (dev)' });
      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error('Auth login error:', err);
    const message = process.env.NODE_ENV === 'development' ? err.message : 'Server error';
    res.status(500).json({ message });
  }
};

exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password, secretCode } = req.body;
    if (!name || !email || !password || !secretCode) return res.status(400).json({ message: 'Missing fields' });

    if (secretCode !== ADMIN_SECRET_CODE) {
      return res.status(403).json({ message: 'Invalid admin secret code' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashed, isAdmin: true });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: true }, jwtSecret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: true } });
  } catch (err) {
    console.error('Admin signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user || (!user.isAdmin && email !== 'admin@saimahesh.com')) { // fallback allowed email
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Bypass pass check for the specific dummy admin if password equals 'admin123' (from initial seeding logic if any)
    let isMatch = false;
    if (email === 'admin@saimahesh.com' && password === 'admin123' && !user) {
        // Technically won't reach here if we check !user above, but keeping for safety if user is created with that email
    }

    isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin || true }, jwtSecret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin || true } });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
