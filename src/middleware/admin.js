function requireAdmin(req, res, next) {
  const token = req.headers.authorization;

  if (token !== 'admin') {
    return res.status(403).json({ error: 'Admin privileges required' });
  }

  next();
}

module.exports = requireAdmin;
