const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  async registerUser(name, email, password) {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return this.generateToken(user.id, user.name, user.email);
  }

  async loginUser(email, password) {
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid Credentials');
    }

    return this.generateToken(user.id, user.name, user.email);
  }

  generateToken(id, name, email) {
    const payload = { user: { id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '5 days' });
    return { token, user: { id, name, email } };
  }
}

module.exports = new AuthService();
