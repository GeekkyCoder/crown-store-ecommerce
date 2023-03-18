const productDB = require("./shop.mongo");
const shopData = require("./shop-data");

async function addProductsIntoDb() {
  shopData.forEach(async (item) => {
    await productDB.insertMany(shopData)
  });
}

async function getAllProducts(){
 const products =  await productDB.find({},{'_id':0,'__v':0}).sort({id:1})
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