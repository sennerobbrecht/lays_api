const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

   
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already in use' });

   
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    if (user.isBlocked) {
  return res.status(403).json({ error: "Account is blocked" });
}


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

  res.json({
  message: 'Login successful',
  token,
  user: {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  }
});

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


exports.toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({ isBlocked: user.isBlocked });
};

