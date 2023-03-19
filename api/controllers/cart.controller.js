const cartsDB = require("../modal/cart.mongo");

const {
  productExistWithId,
  addToCart,
  getLatestCartId,
  updateItemInCart,
  getAllCartItems,
} = require("../modal/cart.modal");

async function getAllItems(req, res) {
  try {
    const allItems = await getAllCartItems();
    return res.status(200).json(allItems);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function addNewItemToCart(req, res) {
  const product = req.body;

  if (!product.name || !product.imageUrl || !product.price) {
    return res.status(400).json("plz add a product first");
  }

  const cartItemExist = await cartsDB.findOne({ id: product.id });

  if (cartItemExist) {
    const updatedCartDBElement = await cartsDB.findOneAndUpdate(
      { id: cartItemExist.id },
      { quantity: cartItemExist.quantity + 1 }
    );
    return res.status(200).json(updatedCartDBElement);
  } else {
    // add the item into the cart db
    const item = await addToCart(product);
    return res.status(201).json(item);
  }
}

async function updateCartItem(req, res) {
  const productId = req.params.id;
  const product = req.body;

  if (!product.quantity)
    return res.status(400).status("quantity required");

  const productExist = await productExistWithId(productId);

  if (!productExist) return res.status(400).json("no such item ");

  const updatedCartItem = await updateItemInCart(productExist, product);

  return res.status(200).json(updatedCartItem);
}



async function removeItem(req, res) {
  const itemId = req.params.id;
  try {
    const itemExist = await productExistWithId(itemId);
    if (!itemExist) return res.status(500).json("item does not exist");
    const deletedItem = await cartsDB.findOneAndDelete({ id: itemExist.id });
    return res.status(200).json(deletedItem);
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = {
  addNewItemToCart,
  updateCartItem,
  getAllItems,
  removeItem,
};
