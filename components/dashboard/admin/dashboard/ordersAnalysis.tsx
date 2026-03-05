"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { adminOrderApi } from '@/lib/api';
import { AnalyticsSkeleton } from '@/components/common/skeleton';
import { OrderAnalytics } from '@/types';

const formatHour = (hour: number) => {
  if (hour === 0) return '12am';
  if (hour < 12) return `${hour}am`;
  if (hour === 12) return '12pm';
  return `${hour - 12}pm`;
};

export default function OrdersAnalysis() {
  const { data, isLoading, error } = useQuery<OrderAnalytics>({
    queryKey: ['order-analytics'],
    queryFn: adminOrderApi.getOrderAnalytics,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 60 * 1000,
  });

  if (isLoading) return <AnalyticsSkeleton />;
  if (error) return <div className="text-red-500 text-center py-10">Failed to load order analytics</div>;

  // Only show hours that have orders or are within business hours (7am - 11pm)
  const chartData = (data?.hourlyOrders ?? [])
    .filter((_, i) => i >= 7 && i <= 23)
    .map(item => ({
      ...item,
      hour: formatHour(item.hour),
    }));

  const now = new Date();
  const timeLabel = `Today · as of ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders Analytics</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Today&apos;s Orders</p>
          <p className="text-2xl font-bold">{data?.total ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">{data?.completed ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-orange-500">{data?.pending ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Today&apos;s Revenue</p>
          <p className="text-2xl font-bold text-[#16A34A]">₦{data?.totalRevenue?.toLocaleString() ?? 0}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold">Orders by Hour</h3>
          <span className="text-xs text-gray-400">{timeLabel}</span>
        </div>
        <p className="text-xs text-gray-400 mb-4">Shows order volume per hour · 7am – 11pm</p>

        {chartData.every(d => d.orders === 0) ? (
          <div className="h-[250px] flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">No orders yet today</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value) => [`${value} orders`, 'Orders']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Bar dataKey="orders" fill="#16A34A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}