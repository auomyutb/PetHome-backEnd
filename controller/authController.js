const middleware = require("../middleware")
const { User } = require("../models/User")

////////////////////////////////////////////

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await middleware.hashPassword(password)
    let existingUser = await User.exists({ email })
    if (existingUser) {
      return res.status(400).send("A user with that email has Already been")
    } else {
      const user = await User.create({ name, email, password })
      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}

////////////////////////////////////////////

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let matched = await middleware.comparePassword(password, user.password)
    if (matched) {
      let payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      }
      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: "Error", message: "Unauthorized" })
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ status: "Error", message: " An error has occurred logging in " })
  }
}

////////////////////////////////////////////

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.id)

    let matched = await middleware.comparePassword(oldPassword, user.password)
    if (matched) {
      let password = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.id, { password })
      let payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      }

      return res
        .status(200)
        .send({ status: "Error", message: " Old Password did not match " })
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: "Error",
      message: " An error has occurred updating password ",
    })
  }
}

////////////////////////////////////////////

module.exports = { Register, Login, UpdatePassword }
