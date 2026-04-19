const express = require("express")
const router = express.Router()

const cartController = require("../controller/cartController")

router.get("/:user", cartController.getUserCart)
router.post("/add", cartController.addToCart)
router.post("/remove", cartController.removeFromCart)
router.delete("/clear/:user", cartController.clearCart)

module.exports = router
