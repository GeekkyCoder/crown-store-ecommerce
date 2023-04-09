const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    id:{
        type:Number
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
        type:Number
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'plz provide user']
    }
},{timestamps:true})

module.exports = mongoose.model("cart",cartSchema)