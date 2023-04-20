const authMiddleware = require('../../middlwares/authMiddleware')
const createPaymentHandler = require('./createPaymentHandler')

const stripeRouter = require('express').Router()

stripeRouter.post('/payment', authMiddleware, createPaymentHandler )


module.exports = stripeRouter