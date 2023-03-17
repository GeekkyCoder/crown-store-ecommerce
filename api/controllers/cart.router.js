const { addNewItemToCart, updateCartItem, getAllItems, removeItem } = require("./cart.controller")


const cartRouter = require("express").Router()

cartRouter.get("/", getAllItems)
cartRouter.post("/", addNewItemToCart)
cartRouter.put("/:id", updateCartItem)
cartRouter.delete("/:id",removeItem)


module.exports = cartRouter