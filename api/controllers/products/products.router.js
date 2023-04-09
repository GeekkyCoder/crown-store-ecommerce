const { getHttpAllProducts } = require("./products.controller");

const productsRouter = require("express").Router();

productsRouter.get("/", getHttpAllProducts);

module.exports = productsRouter;
