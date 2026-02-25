// lib/api/orders.ts
import { CheckoutResponse, Order } from "@/types";

export const orderApi = {
  createCheckout: async (tableNumber: number): Promise<CheckoutResponse> => {
    const res = await fetch('/api/users/orders/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableNumber }),
    });
    if (!res.ok) throw new Error('Failed to create checkout');
    return res.json();
  },

  placeOrder: async (tableNumber: number): Promise<Order> => {
    const res = await fetch('/api/users/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableNumber }),
    });
    if (!res.ok) throw new Error('Failed to place order');
    return res.json();
  },
};