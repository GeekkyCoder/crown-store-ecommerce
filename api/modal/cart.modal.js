const cartsDB = require("./cart.mongo");

const DEFAULT_CART_ID = 1

async function productExistWithId(id) {
  return await cartsDB.findOne({ id });
}

async function addToCart(product) {
  const newProduct = await new cartsDB(product);
  return await newProduct.save();
}

async function getLatestCartId() {
    const latestProduct = await cartsDB.findOne().sort({id:1});
    if (!latestProduct) {
      return DEFAULT_CART_ID;
    }
    console.log(`product:${latestProduct}`)
    return latestProduct.id;
  }


async function updateItemInCart(productToUpdate,payloadProduct){
   const removedItem = await cartsDB.updateOne({
    id:productToUpdate.id
   },{
      name:payloadProduct.name,
      price:payloadProduct.price
   },{
    upsert:true
   })

   return removedItem
}  

module.exports = {
  productExistWithId,
  addToCart,
  getLatestCartId,
  updateItemInCart,
};
