const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:false
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
    },
    quantity:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model("cart",cartSchema)