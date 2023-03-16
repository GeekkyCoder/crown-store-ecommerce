const { productExistWithId, addToCart,getLatestCartId, updateItemInCart } = require("../modal/cart.modal");

async function addNewItemToCart(req, res) {
  const product = req.body;
  // does the product exist in the db ?

  if (!product.name || !product.imageUrl || !product.price) {
    return res.status(400).json("plz add a product first");
  }

  const productExist = await productExistWithId(product);

  if (!productExist) {
    /// add the new product
    const item = await addToCart(product);
    const latestProductId = await getLatestCartId() + 1
    const newItem = {...item,id:latestProductId}
    return res.status(201).json(newItem._doc);
  } else {
    // already exist in the db
    return res.status(400).json("product already exist");
  }
}

async function updateCartItem(req,res){
   const productId = req.params.id
   const product = req.body 

   if((!product.name || !product.imageUrl || !product.price)) return res.status(400).status("payload required")

   const productExist = await productExistWithId(productId)

   if(!productExist) return res.status(400).json("no such item ")

   const deletedCartItem = await updateItemInCart(productExist,product)

   return res.status(200).json(deletedCartItem)

}

module.exports = {
  addNewItemToCart,
  updateCartItem
};
