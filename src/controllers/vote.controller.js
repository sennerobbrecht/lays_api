const Vote = require('../models/Vote');
const Bag = require('../models/Bag');

exports.addVote = async (req, res) => {
  try {
    const { bagId } = req.params;
    const userId = req.user.id;

    
    const bagExists = await Bag.findById(bagId);
    if (!bagExists) return res.status(404).json({ error: 'Bag not found' });

    
    const vote = await Vote.create({ user: userId, bag: bagId });

    res.status(201).json({
      message: "Vote added",
      vote
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "You already voted for this bag" });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.removeVote = async (req, res) => {
  try {
    const { bagId } = req.params;
    const userId = req.user.id;

    const deleted = await Vote.findOneAndDelete({ user: userId, bag: bagId });

    if (!deleted) return res.status(404).json({ error: "Vote not found" });

    res.json({ message: "Vote removed" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("user email").populate("bag name");
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
