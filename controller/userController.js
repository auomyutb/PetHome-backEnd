const User = require("../models/User")

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_password")
    res.json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select("_password")
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("_password")
    res.json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.json({ message: "uer deleted" })
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }
