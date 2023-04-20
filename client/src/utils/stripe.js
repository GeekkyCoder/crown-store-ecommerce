require('dotenv').config()
import {loadStripe} from "@stripe/stripe-js"

export const stripeLoadPromise =  loadStripe(process.env.STRIPE_PUBLIC_KEY)