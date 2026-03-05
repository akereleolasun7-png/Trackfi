"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminOrderApi } from '@/lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createClient } from '@/utils/supabase/client';
import { TimeFilter , TIME_FILTERS , StatusFilter, OrderItem, OrderStatus, ORDER_STATUSES } from '@/types';
import { AnalyticsSkeleton } from '@/components/common/skeleton';


export default function AdminOrders() {
  const queryClient = useQueryClient();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Realtime
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('admin-orders-realtime')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); }
  }, [queryClient]);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: adminOrderApi.getAdminOrders,
    refetchInterval: 15000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      adminOrderApi.updateStatus(orderId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
    onError: () => toast.error('Failed to update order status'),
  });

  const closeSessionMutation = useMutation({
    mutationFn: (sessionId: string) => adminOrderApi.closeSession(sessionId),
    onSuccess: () => {
      toast.success('Table closed');
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });

  const filteredOrders = orders.filter((order) => {
    const orderTime = new Date(order.created_at);
    const now = new Date();
    const hour = orderTime.getHours();

    if (timeFilter === 'today') {
      const isToday = orderTime.toDateString() === now.toDateString();
      const isBusinessHours = hour >= 7 && hour < 23;
      if (!(isToday && isBusinessHours)) return false;
    }

    if (timeFilter === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      if (orderTime < weekAgo) return false;
    }

    if (timeFilter === 'month') {
      const monthAgo = new Date(now);
      monthAgo.setMonth(now.getMonth() - 1);
      if (orderTime < monthAgo) return false;
    }

    if (timeFilter === '6months') {
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      if (orderTime < sixMonthsAgo) return false;
    }

    if (timeFilter === 'year') {
      const yearAgo = new Date(now);
      yearAgo.setFullYear(now.getFullYear() - 1);
      if (orderTime < yearAgo) return false;
    }

    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    return true;
  });

  if (isLoading) return <AnalyticsSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <span className="text-sm text-gray-400">{filteredOrders.length} orders</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Time filter */}
        <div className="flex rounded-lg border overflow-hidden">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
            className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          >
            {TIME_FILTERS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
        >
          <option value="all">All Statuses</option>
          {ORDER_STATUSES.map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No orders found</p>
          <p className="text-sm mt-1">Try changing the filters</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => {
            const tableNumber = order.table_sessions?.tables?.table_number ?? '—';
            return (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Table {tableNumber}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="space-y-1">
                  {order.order_items?.map((item: OrderItem) => {
                    const menu = Array.isArray(item.menu_items) ? item.menu_items[0] : item.menu_items;
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity}x {menu?.name}</span>
                        <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-bold">₦{order.total_amount?.toLocaleString()}</span>
                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatusMutation.mutate({
                        orderId: order.id,
                        status: e.target.value as OrderStatus
                      })}
                      className="text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                    >
                      {ORDER_STATUSES.map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>

                    {order.status === 'completed' && (
                      <button
                        onClick={() => closeSessionMutation.mutate(order.table_session_id)}
                        className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Close Table
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );  
          })}
        </div>
      )}
    </div>
  );
}