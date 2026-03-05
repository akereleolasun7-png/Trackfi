export interface TopItemMenu {
  name: string;
  category: string;
  orders: number;
  revenue: number;
}

export interface UnavailableItemMenu {
  id: string;
  name: string;
  category: string;
}
export interface MenuAnalyticsResponse {
  topSelling: TopItemMenu[];
  unavailable: UnavailableItemMenu[];
}

export interface HourlyOrder {
  hour: number;
  orders: number;
}

export interface OrderAnalytics {
  total: number;
  completed: number;
  pending: number;
  preparing: number;
  totalRevenue: number;
  hourlyOrders: HourlyOrder[];
}
export interface DailyRevenue {
  date: string;
  revenue: number;
}

export interface RevenueAnalyticsResponse {
  today: number;
  thisWeek: number;
  thisMonth: number;
  dailyRevenue: DailyRevenue[];
}