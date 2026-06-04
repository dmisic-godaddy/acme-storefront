import React from 'react'

/**
 * UI Extension: checkout.form.shipping.after
 *
 * Displays a short informational notice below the shipping section in checkout,
 * confirming that ACME's shipping options are active.
 */
export function ShippingInfoBanner() {
  return (
    <div style={{
      padding: '12px 16px',
      background: '#f0f4ff',
      border: '1px solid #c7d7ff',
      borderRadius: '6px',
      margin: '8px 0',
      fontSize: '14px',
      color: '#333',
    }}>
      🚚 ACME shipping rates are active — all orders ship within 3–5 business days.
    </div>
  )
}

export default ShippingInfoBanner
