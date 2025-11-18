const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bag',
    required: true
  }
}, { timestamps: true });

VoteSchema.index({ user: 1, bag: 1 }, { unique: true }); 

module.exports = mongoose.model('Vote', VoteSchema);
