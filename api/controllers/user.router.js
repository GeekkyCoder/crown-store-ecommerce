const { userSignUp, userLogin } = require("./user.controller")

const userRouter = require("express").Router()

userRouter.post("/signup",userSignUp )
userRouter.post("/login",userLogin )


module.exports = userRouter