"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { adminRevenueApi } from '@/lib/api';
import { AnalyticsSkeleton } from '@/components/common/skeleton';
import { RevenueAnalyticsResponse } from '@/types';

export default function RevenueAnalysis() {
  const { data, isLoading, error } = useQuery<RevenueAnalyticsResponse>({
    queryKey: ['revenue-analytics'],
    queryFn: adminRevenueApi.getRevenueAnalytics,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <AnalyticsSkeleton />;
  if (error) return <div className="text-red-500 text-center py-10">Failed to load revenue analytics</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Revenue Analytics</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-3xl font-bold">₦{data?.today?.toLocaleString() ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">This Week</p>
          <p className="text-3xl font-bold">₦{data?.thisWeek?.toLocaleString() ?? 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-3xl font-bold">₦{data?.thisMonth?.toLocaleString() ?? 0}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-1">Revenue Trend</h3>
        <p className="text-xs text-gray-400 mb-4">Last 7 days · completed orders only</p>

        {!data?.dailyRevenue?.length ? (
          <div className="h-[250px] flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">No revenue data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data.dailyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, 'Revenue']} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#16A34A"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}