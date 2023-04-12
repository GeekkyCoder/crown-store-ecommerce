// const { updateCartItem } = require("../../controllers/cart/cart.controller");
const cartsDB = require("./cart.mongo");
const productDB = require("./shop.mongo");

const DEFAULT_CART_ID = 1;

async function productExistWithId(productId) {
  return await cartsDB.findOne({ id: productId });
}

async function addToCart(product) {
  const item = await cartsDB.create({ ...product, quantity: 1 });
  return item;
}

async function getLatestCartId() {
  const latestProduct = await cartsDB.findOne().sort({ id: 1 });
  if (!latestProduct) {
    return DEFAULT_CART_ID;
  }
  console.log(`product:${latestProduct}`);
  return latestProduct.id;
}

async function updateItemInCart(productToUpdate, quantity, createdBy) {
  const updatedItem = await cartsDB.findOneAndUpdate(
    {
      id: productToUpdate.id,
      createdBy,
    },
    {
      quantity,
    },
    {
      upsert: true,
    }
  );

  return updatedItem;
}

async function getAllCartItems(userId) {
  console.log("sahi hae");
  return await cartsDB.find({ createdBy: userId });
}

module.exports = {
  productExistWithId,
  addToCart,
  getLatestCartId,
  updateItemInCart,
  getAllCartItems,
};
