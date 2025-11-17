const votes = require('../data/votes');
const bags = require('../data/bags');

//POST /api/v1/vote/:bag
exports.createVote = (req, res) => {
  const bagId = Number(req.params.bag);
  const { user } = req.body;


  if (!user) {
    return res.status(400).json({ error: 'User is required' });
  }


  const bag = bags.find(b => b.id === bagId);
  if (!bag) {
    return res.status(404).json({ error: 'Bag not found' });
  }


  const existing = votes.find(v => v.bagId === bagId && v.user === user);
  if (existing) {
    return res.status(409).json({ error: 'User has already voted for this bag' });
  }

  const newVote = {
    id: votes.length + 1,
    bagId,
    user
  };

  votes.push(newVote);

  res.status(201).json(newVote);
};

// DELETE /api/v1/vote/:bag
exports.deleteVote = (req, res) => {
  const bagId = Number(req.params.bag);
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ error: 'User is required' });
  }

  const index = votes.findIndex(v => v.bagId === bagId && v.user === user);

  if (index === -1) {
    return res.status(404).json({ error: 'Vote not found' });
  }

  const deleted = votes.splice(index, 1)[0];

  res.json({
    message: 'Vote removed',
    vote: deleted
  });
};