const Donation = require('../models/Donation')

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 })
    res.json(donations)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations' })
  }
}

const createDonation = async (req, res) => {
  try {
    const newDonation = await Donation.create({
      fullName: req.body.fullName,
      email: req.body.email,
      amount: req.body.amount,
      note: req.body.note,
      transferImage: req.file ? req.file.filename : ''
    })

    res.status(201).json(newDonation)
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation' })
  }
}

module.exports = {
  getDonations,
  createDonation
}
