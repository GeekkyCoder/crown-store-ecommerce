const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("express-async-errors");
const path = require("path");

require("dotenv").config();

const userRouter = require("./controllers/user/user.router");
const productsRouter = require("./controllers/products/products.router");
const cartRouter = require("./controllers/cart/cart.router");

const notFoundMiddleware = require("./middlwares/not-found");
const errorHandlerMiddleware = require("./middlwares/error-handler");

const authMiddleware = require("./middlwares/authMiddleware");
const stripeRouter = require("./controllers/stripe/stripeRouter");

const app = express();

app.use(express.json());


app.use(express.static(path.resolve(__dirname, "..", "./client/build")));

app.use(cors({
  origin:'http://localhost:3000'
}));


app.use(cookieParser());

app.use((req, res, next) => {
  next();
  console.log(`${req.method}${req.url}`);
});


app.use('/stripe', stripeRouter)

app.use("/auth", userRouter);
app.use("/products", productsRouter);

// app.use(authMiddleware);
app.use("/cart", authMiddleware, cartRouter);

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "./client/build",'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
