const users = require('../data/users');

// POST /api/v1/user
exports.createUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;


  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }


  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    password
  };

  users.push(newUser);


  const { password: _, ...safeUser } = newUser;

  res.status(201).json(safeUser);
};

// GET /api/v1/user/:id
exports.getUserById = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

 
  const { password, ...safeUser } = user;

  res.json(safeUser);
};
