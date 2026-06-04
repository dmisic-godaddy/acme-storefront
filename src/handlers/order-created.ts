import { Request, Response } from 'express'
import crypto from 'crypto'

/**
 * Verify the platform's webhook signature (HMAC-SHA256).
 * Header used: X-GoDaddy-Signature-SHA256
 */
function verifyWebhookSignature(req: Request): boolean {
  const secret = process.env.GODADDY_WEBHOOK_SECRET
  if (!secret) return true

  const signature = req.headers['x-godaddy-signature-sha256'] as string
  if (!signature) return false

  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex')

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

/**
 * Subscription: commerce.order.created
 *
 * Platform POSTs the order payload here when a new order is placed.
 * Rule: respond with 200 immediately, process async.
 *
 * Docs: https://…/guides/applications/webhooks
 */
export async function handleOrderCreated(req: Request, res: Response): Promise<void> {
  if (!verifyWebhookSignature(req)) {
    res.status(401).send('Invalid signature')
    return
  }

  // Acknowledge immediately — platform expects a response within 30s
  res.status(200).send('OK')

  // Async processing (fire-and-forget for this test app)
  processEvent(req.body).catch((err: unknown) => {
    console.error('Failed to process webhook event:', err)
  })
}

async function processEvent(event: Record<string, unknown>): Promise<void> {
  const { eventId, eventType, storeId, data } = event as {
    eventId?: string
    eventType?: string
    storeId?: string
    data?: { orderId?: string }
  }

  console.log('Order event received:', {
    eventId,
    eventType,
    storeId,
    orderId: data?.orderId,
    at: new Date().toISOString(),
  })
}
