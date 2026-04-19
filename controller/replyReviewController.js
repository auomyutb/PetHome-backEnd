const ReplyReview = require("../models/ReplyReview")

////////////////////////////////////////////

const getReply = async (req, res) => {
  try {
    const { review } = req.params
    const reply = await ReplyReview.find({ review }).populate("user", "name")
    res.json(reply)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const createReply = async (req, res) => {
  try {
    const { review, user, comment } = req.body
    const reply = await ReplyReview.create({ review, user, comment })
    res.json(reply)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

module.exports = { getReply, createReply }
