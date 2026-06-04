import express from 'express'
import { calculateShippingRates } from './handlers/shipping-rates'
import { handleOrderCreated } from './handlers/order-created'

const app = express()

app.use(express.json())

// Action: platform calls this to get shipping rates at checkout
app.post('/api/shipping-rates', calculateShippingRates)

// Subscription: platform sends order events here
app.post('/webhooks/orders', handleOrderCreated)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`acme-storefront running on port ${PORT}`)
})
