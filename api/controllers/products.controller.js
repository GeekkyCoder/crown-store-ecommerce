const {getAllProducts} = require("../modal/shop.modal")


async function getHttpAllProducts(req,res){
    const products = await getAllProducts()
    return res.status(200).json(products)
}

module.exports = {
    getHttpAllProducts
}