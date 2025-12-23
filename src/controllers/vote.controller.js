const Vote = require("../models/Vote")
const Bag = require("../models/Bag")

exports.addVote = async (req, res) => {
  try {
    const { bagId } = req.params
    const userId = req.user.id
    const io = req.app.get("io")

    const bagExists = await Bag.findById(bagId)
    if (!bagExists) return res.status(404).json({ error: "Bag not found" })

    const vote = await Vote.create({ user: userId, bag: bagId })

    const count = await Vote.countDocuments({ bag: bagId })

    io.emit("vote-updated", {
      bagId,
      count
    })

    res.status(201).json({
      message: "Vote added",
      vote,
      count
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "You already voted for this bag" })
    }
    res.status(500).json({ error: error.message })
  }
}

exports.removeVote = async (req, res) => {
  try {
    const { bagId } = req.params
    const userId = req.user.id
    const io = req.app.get("io")

    const deleted = await Vote.findOneAndDelete({ user: userId, bag: bagId })
    if (!deleted) return res.status(404).json({ error: "Vote not found" })

    const count = await Vote.countDocuments({ bag: bagId })

    io.emit("vote-updated", {
      bagId,
      count
    })

    res.json({
      message: "Vote removed",
      count
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.find().select("user bag").lean()
    res.json(votes)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch votes" })
  }
}
