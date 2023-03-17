const { updateCartItem } = require("../controllers/cart.controller");
const cartsDB = require("./cart.mongo");

const DEFAULT_CART_ID = 1

async function productExistWithId(productId) {
  return await cartsDB.findOne({ id:productId });
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
   const updatedItem = await cartsDB.updateOne({
    id:productToUpdate.id
   },{
      name:payloadProduct.name,
      price:payloadProduct.price
   },{
    upsert:true
   })

   return updatedItem
}  


async function getAllCartItems(){
  return await cartsDB.find({},{"_id":0,"__v":0}).sort({'id':1})
}

module.exports = {
  productExistWithId,
  addToCart,
  getLatestCartId,
  updateItemInCart,
  getAllCartItems,
};
