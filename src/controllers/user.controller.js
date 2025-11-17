const users = require('../data/users');


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
