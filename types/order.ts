// types/index.ts - keep types only here, remove from api file
export interface Order {
  id: string;
  table_session_id: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total_amount: number;
  estimated_time: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CheckoutResponse {
  url: string;
}