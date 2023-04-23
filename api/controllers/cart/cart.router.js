const {
  addNewItemToCart,
  updateCartItem,
  getAllItems,
  removeItem,
  clearAllCart
} = require("./cart.controller");

const cartRouter = require("express").Router();

cartRouter.get("/", getAllItems);
cartRouter.post("/", addNewItemToCart);
cartRouter.put("/:id", updateCartItem);
cartRouter.delete("/:id", removeItem);
cartRouter.get("/removeAll", clearAllCart);

module.exports = cartRouter;
