const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const devStore = require('../devAuthStore');

const jwtSecret = process.env.JWT_SECRET || 'change-this-secret';

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

    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Auth login error:', err);
    const message = process.env.NODE_ENV === 'development' ? err.message : 'Server error';
    res.status(500).json({ message });
  }
};
