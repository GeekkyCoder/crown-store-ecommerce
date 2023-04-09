const productDB = require("../cart/shop.mongo");
const shopData = require("./shop-data");

async function addProductsIntoDb() {
  shopData.forEach(async (item) => {
    await productDB.insertMany(shopData)
  });
}

async function getAllProducts(){
 const products =  await productDB.find({}).sort("quantity")
 const allProducts = modifyArray(products)
 return allProducts
}

function modifyArray(products){
  return products.reduce((acc,item) => {
     const {title,items} = item 
     acc[title.toLowerCase()] = items 
     return acc 
  },{})
}

module.exports = {
    addProductsIntoDb,
    getAllProducts
}