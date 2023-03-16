const { addNewItemToCart, updateCartItem } = require("./cart.controller")


const cartRouter = require("express").Router()

cartRouter.post("/cart", addNewItemToCart)
cartRouter.put("/cart/:id", updateCartItem)


module.exports = cartRouter