# Shipping Calculator

A test GoDaddy Platform Application (GPA) that exercises all three capability types: an action, a webhook subscription, and a UI extension.

## Capabilities

| Type | Name | Endpoint / Source |
|---|---|---|
| **Action** | `commerce.shipping-rates.calculate` | `POST /api/shipping-rates` |
| **Subscription** | `order-notifications` | `POST /webhooks/orders` |
| **UI Extension** | `ShippingInfoBanner` | `extensions/shipping-info-banner/src/index.tsx` |

## Project Structure

```
acme-storefront/
├── godaddy.toml                          # GPA configuration
├── src/
│   ├── index.ts                          # Express server
│   └── handlers/
│       ├── shipping-rates.ts             # Action handler
│       └── order-created.ts             # Webhook handler
├── extensions/
│   └── shipping-info-banner/
│       └── src/
│           └── index.tsx                 # UI extension component
├── rollup.config.mjs                     # Extension bundler config
└── .env.example
```

## Setup

```bash
npm install
cp .env.example .env
```

Set `GODADDY_WEBHOOK_SECRET` in `.env` to the value from the developer portal (leave blank to skip signature verification during local testing).

## Running

```bash
# Development
npm run dev

# Production build
npm run build && npm start
```

## UI Extension

The extension source is at `extensions/shipping-info-banner/src/index.tsx`. GoDaddy's build pipeline bundles and hosts it on their CDN — no local build step required.

## Authentication

- **Action** (`/api/shipping-rates`): expects an OAuth Bearer token in the `Authorization` header — issued by the platform per request.
- **Subscription** (`/webhooks/orders`): expects an HMAC-SHA256 signature in the `X-GoDaddy-Signature-SHA256` header — verified against `GODADDY_WEBHOOK_SECRET`.
