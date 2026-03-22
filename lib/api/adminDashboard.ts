import { DashboardStats } from "@/types";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await fetch('/api/admin/staffs/stats');
    if (!res.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    return res.json();
  },
};