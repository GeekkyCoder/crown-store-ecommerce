const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: String,
  items: [
    {
      id: Number,
      name: String,
      price: String,
      imageUrl:String,
      route:String,
    }
  ]
})


module.exports = mongoose.model("product",productSchema)