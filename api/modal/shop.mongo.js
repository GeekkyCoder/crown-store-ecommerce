const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("product",productSchema)