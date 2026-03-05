// components/dashboard/admin/orders/OrderItemsModal.tsx
import { OrderItem, Order } from '@/types';
import { XCircle } from 'lucide-react';

interface Props {
  order: Order;
  onClose: () => void;
}

export default function OrderItemsModal({ order, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">
            Table {order.table_sessions?.tables?.table_number ?? '—'} — All Items
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {order.order_items?.map((item: OrderItem) => {
            const menu = Array.isArray(item.menu_items) ? item.menu_items[0] : item.menu_items;
            return (
              <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">{item.quantity}x {menu?.name ?? 'Item'}</span>
                <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t font-bold">
          <span>Total</span>
          <span>₦{order.total_amount?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}