const mongoose = require('mongoose');

const BagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    bagColor: { type: String, required: true },
    font: { type: String, required: true },
    pattern: { type: String, required: true },
    packaging: { type: String, required: true },
    inspiration: { type: String, required: true },
    keyFlavours: { type: [String], required: true },
    user: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bag', BagSchema);
