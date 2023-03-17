const express = require("express")
const cors = require("cors")
require("dotenv").config()

const productsRouter = require("./controllers/products.router")
const cartRouter = require("./controllers/cart.router")

const app = express()

app.use(express.json())

app.use(cors())

app.use("/products",productsRouter)
app.use("/cart",cartRouter)

module.exports = app