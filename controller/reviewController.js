const Review = require("../models/Review")

////////////////////////////////////////////

const getPetReviews = async (req, res) => {
  try {
    const { pet } = req.params
    const review = await Review.find({ pet }).populate("user", "name")
    res.json(review)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const createReview = async (req, res) => {
  try {
    const { usr, pet, rating, comment } = req.body

    const review = await Review.create({
      user,
      pet,
      rating,
      comment,
    })
    res.json(review)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const deleteReview = async (req, res) => {
  try {
    const { review } = req.params

    await Review.findByIdAndDelete(review)
    res.json({ message: " Review delete" })
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

module.exports = { getPetReviews, createReview, deleteReview }
