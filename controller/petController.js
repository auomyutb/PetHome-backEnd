const Pet = require("../models/Pet.js")

////////////////////////////////////////////

const getAllPets = async (req, res) => {
  try {
    const pets = await pet.find()
    res.json(pets)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const getPetById = async (req, res) => {
  try {
    const { id } = req.params
    const pet = await Pet.findById(id)
    if (!pet) {
      return res.status(404).json({
        message: "Pet Not Found",
      })
    }

    res.json(pet)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body)
    res.json(pet)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const updatePet = async (req, res) => {
  try {
    const { id } = req.params
    const pet = await Pet.findByIdAndUpdate(id, re.body, { new: true })
    res.json(pet)
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

const deletePet = async (req, res) => {
  try {
    const { id } = req.params
    await Pet.findByIdAndDelete(id)
    res.json({ message: " Pet Delete " })
  } catch (error) {
    res.status(500).json(error)
  }
}

////////////////////////////////////////////

module.exports = { getAllPets, getPetById, createPet, updatePet, deletePet }
