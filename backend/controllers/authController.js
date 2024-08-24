const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // בדיקת שם משתמש קיים
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: 'Username already exists' });
    }

    // בדיקת אימייל קיים (אם נדרש)
    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).send({ error: 'Email already exists' });
      }
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 8);

    // יצירת משתמש חדש עם אימייל ריק אם אינו קיים
    const user = new User({ username, password: hashedPassword, email: email || null });
    await user.save();

    // יצירת JWT עבור המשתמש החדש
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(400).send({ error: 'Registration failed. Please try again.' });
  }
};


// Login a user
exports.login = async (req, res) => {
  const { identifier, password } = req.body; // שינוי מ-username ל-identifier

  try {
    // חיפוש משתמש לפי שם משתמש או אימייל
    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
