import { RevenueAnalyticsResponse } from "@/types";

export const adminRevenueApi = {
  getRevenueAnalytics: async (): Promise<RevenueAnalyticsResponse> => {
    const res = await fetch('/api/admin/revenue/analytics');
    if (res.status === 401) throw new Error('Session expired');
    if (!res.ok) throw new Error('Failed to fetch revenue analytics');
    return res.json();
  },
};