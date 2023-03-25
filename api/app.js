const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const productsRouter = require("./controllers/products.router")
const cartRouter = require("./controllers/cart.router")


const app = express()

app.use(express.json())

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(cookieParser())


app.use((req,res,next) => {
    next()
    console.log(`${req.method}${req.url}`)
})

app.use("/products",productsRouter)
app.use("/cart",cartRouter)


module.exports = app