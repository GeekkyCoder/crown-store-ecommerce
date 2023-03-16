const productDB = require("./shop.mongo");
const shopData = require("./shop-data");

async function addProductsIntoDb() {
  shopData.forEach(async (item) => {
    await productDB.findOneAndUpdate(
      {
        id: item.id,
        imageUrl: item.imageUrl,
        price: item.price,
        name: item.name,
      },
      {
        item,
      },
      {
        upsert: true,
      }
    ,{'_id':0,'__v':0});
  });
}




async function getAllProducts(){
 return await productDB.find({},{'_id':0,'__v':0}).sort({id:1})
}

module.exports = {
    addProductsIntoDb,
    getAllProducts
}