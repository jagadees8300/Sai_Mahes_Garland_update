const bcrypt = require('bcryptjs');

const users = [];

module.exports = {
  findByEmail: async (email) => {
    return users.find(u => u.email === email) || null;
  },
  createUser: async ({ name, email, password }) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = { id: `${Date.now()}-${Math.floor(Math.random()*10000)}`, name, email, password: hashed };
    users.push(user);
    return { id: user.id, name: user.name, email: user.email };
  },
  comparePassword: async (plain, hashed) => {
    return bcrypt.compare(plain, hashed);
  }
};
