import { Request, Response } from 'express'

/**
 * Verify the OAuth Bearer token the platform includes in every action request.
 * In production, use @godaddy/app-connect's verifyToken() middleware for full
 * JWT validation. Here we do a lightweight presence check so the endpoint works
 * during portal testing without an extra dependency.
 */
function verifyBearerToken(req: Request): boolean {
  const auth = req.headers['authorization']
  return typeof auth === 'string' && auth.startsWith('Bearer ')
}

/**
 * Action: commerce.shipping-rates.calculate
 *
 * Platform POSTs the cart origin/destination/packages here and expects
 * back a list of available shipping rates.
 *
 * Docs schema: https://…/guides/applications/actions#request-response-schemas
 */
export async function calculateShippingRates(req: Request, res: Response): Promise<void> {
  if (!verifyBearerToken(req)) {
    res.status(401).json({
      name: 'Unauthorized',
      correlationId: req.headers['x-request-id'] as string ?? 'unknown',
      message: 'Missing or invalid Bearer token',
    })
    return
  }

  // Return one simple flat-rate option — enough to prove the action works
  res.json({
    rates: [
      {
        id: 'flat-rate',
        name: 'Standard Shipping',
        price: {
          amount: 5.99,
          currency: 'USD',
        },
        deliveryDays: '3-5',
        carrier: 'ACME Logistics',
      },
    ],
  })
}
