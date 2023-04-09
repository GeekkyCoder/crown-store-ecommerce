const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("express-async-errors");

require("dotenv").config();

const userRouter = require("./controllers/user/user.router");
const productsRouter = require("./controllers/products/products.router");
const cartRouter = require("./controllers/cart/cart.router");

const notFoundMiddleware = require("./middlwares/not-found");
const errorHandlerMiddleware = require("./middlwares/error-handler");

const authMiddleware = require("./middlwares/authMiddleware")

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());

app.use((req, res, next) => {
  next();
  console.log(`${req.method}${req.url}`);
});

app.use("/auth", userRouter);
app.use("/products", productsRouter);

app.use(authMiddleware)
app.use("/cart", cartRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
