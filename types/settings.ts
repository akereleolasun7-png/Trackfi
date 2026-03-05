export interface RestaurantSettings {
  id: string;
  table_count: number;
  order_code: number;
  accepting_orders: boolean;
  created_at: string;
  updated_at: string;
}
export interface TableQR {
  tableNumber: number;
  qrCodeUrl: string;
  paymentCode: string;
}
