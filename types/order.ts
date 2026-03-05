export const ORDER_STATUSES = ['pending', 'preparing', 'ready', 'completed', 'cancelled'] as const;
export type OrderStatus = typeof ORDER_STATUSES[number];
export interface Order {
  id: string;
  table_session_id: string;
  status: OrderStatus;
  total_amount: number;
  estimated_time: number;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
  table_sessions?: {
    table_id: string;
    tables: {
      table_number: number;
    } | null;
  } | null;
}
export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menu_items: { id: string; name: string; image_url: string; video_url:string;} | { id: string; name: string; image_url: string ; video_url: string;}[] | null;
}

export type OrderWithItems = Order & { order_items: OrderItem[] };

export interface CheckoutResponse {
  url: string;
}