import { Order} from "@/types";

export const adminOrderApi = {
  getAdminOrders: async (): Promise<Order[]> => {
    const res = await fetch(`/api/admin/orders`);
    if (res.status === 401) {
      throw new Error('Session expired'); 
    }
    if (!res.ok) {
      throw new Error('Failed to fetch orders');
    }
    return res.json();
  },
  
updateStatus: async (orderId: string, status: string) => {
  const res = await fetch(`/api/admin/orders/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, status }),
  });
  if (res.status === 401) throw new Error('Session expired');
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
},

closeSession: async (sessionId: string) => {
  const res = await fetch(`/api/admin/orders/close-session`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  if (res.status === 401) throw new Error('Session expired');
  if (!res.ok) throw new Error('Failed to close session');
  return res.json();
},
  getOrderAnalytics: async () => {
  const res = await fetch('/api/admin/orders/analytics');
  if (res.status === 401) throw new Error('Session expired');
  if (!res.ok) throw new Error('Failed to fetch order analytics');
  return res.json();
},

};
