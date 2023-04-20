require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51MYkTLALrjdA4aW4nfcAuUyyCvuZDKp9So8gqSHLSagaQVHMpv3UyI05QCtkJI0TGlDaXni0erheTrr2IpiIofB800JnpwYnha"
);

const createPaymentHandler = async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = createPaymentHandler;
