// lib/mock/alerts.ts
export const mockAlerts = [
  {
    id: 'alt_001',
    title: 'SOL Target Reached',
    description: 'Solana surpassed $145.00. High volatility detected in the last hour.',
    type: 'target' as const,
    triggered: true,
    action: 'Manage Position',
  },
  {
    id: 'alt_002',
    title: 'ETH Buy Limit',
    description: 'Order for 0.5 ETH at $3,200.00 is now active in the order book.',
    type: 'limit' as const,
    triggered: true,
    action: 'Edit Price',
  },
]