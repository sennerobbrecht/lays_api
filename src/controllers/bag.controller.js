const bags = require('../data/bags');

exports.getAllBags = (req, res) => {
  res.json(bags);
};

exports.getBagById = (req, res) => {
  const bag = bags.find(b => b.id == req.params.id);
  if (!bag) return res.status(404).json({ error: 'Bag not found' });
  res.json(bag);
};

exports.createBag = (req, res) => {
  const {
    name, image, bagColor, font, pattern, packaging,
    inspiration, keyFlavours, user
  } = req.body;

  if (!name || !image || !bagColor || !font || !pattern || !packaging || !inspiration || !keyFlavours || !user) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newBag = {
    id: bags.length + 1,
    name, image, bagColor, font, pattern,
    packaging, inspiration, keyFlavours, user
  };

  bags.push(newBag);

  res.status(201).json(newBag);
};

exports.updateBag = (req, res) => {
  const id = Number(req.params.id);
  const bagIndex = bags.findIndex(b => b.id === id);

  if (bagIndex === -1) return res.status(404).json({ error: 'Bag not found' });

  const {
    name, image, bagColor, font, pattern, packaging,
    inspiration, keyFlavours, user
  } = req.body;

  if (!name || !image || !bagColor || !font || !pattern || !packaging || !inspiration || !keyFlavours || !user) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const updatedBag = {
    id,
    name, image, bagColor, font, pattern,
    packaging, inspiration, keyFlavours, user
  };

  bags[bagIndex] = updatedBag;

  res.json(updatedBag);
};

exports.deleteBag = (req, res) => {
  const id = Number(req.params.id);
  const bagIndex = bags.findIndex(b => b.id === id);

  if (bagIndex === -1) return res.status(404).json({ error: 'Bag not found' });

  const deleted = bags.splice(bagIndex, 1)[0];

  res.json({
    message: 'Bag deleted',
    bag: deleted
  });
};
