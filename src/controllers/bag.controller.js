const Bag = require('../models/Bag');

// GET all bags
exports.getAllBags = async (req, res) => {
  try {
    const bags = await Bag.find();
    res.json(bags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET bag by ID
exports.getBagById = async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id);
    if (!bag) {
      return res.status(404).json({ error: 'Bag not found' });
    }
    res.json(bag);
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

// CREATE new bag
exports.createBag = async (req, res) => {
  try {
    const bag = await Bag.create(req.body);
    res.status(201).json(bag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE bag
exports.updateBag = async (req, res) => {
  try {
    const updatedBag = await Bag.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBag) {
      return res.status(404).json({ error: 'Bag not found' });
    }

    res.json(updatedBag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE bag
exports.deleteBag = async (req, res) => {
  try {
    const deletedBag = await Bag.findByIdAndDelete(req.params.id);

    if (!deletedBag) {
      return res.status(404).json({ error: 'Bag not found' });
    }

    res.json({
      message: 'Bag deleted',
      bag: deletedBag
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};
