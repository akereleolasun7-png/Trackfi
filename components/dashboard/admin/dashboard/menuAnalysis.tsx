"use client";

import { useQuery } from '@tanstack/react-query';
import { adminMenuApi } from '@/lib/api';
import { AnalyticsSkeleton } from '@/components/common/skeleton';
import { TopItemMenu, UnavailableItemMenu, MenuAnalyticsResponse} from '@/types'

export default function MenuAnalysis() {
  const { data, isLoading, error } = useQuery<MenuAnalyticsResponse>({
    queryKey: ['menu-analytics'],
    queryFn: adminMenuApi.getAnalytics,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <AnalyticsSkeleton />;

  if (error) return (
    <div className="text-red-500 text-center py-10">Failed to load menu analytics</div>
  );

  const topSelling: TopItemMenu[] = data?.topSelling ?? [];
  const unavailable: UnavailableItemMenu[] = data?.unavailable ?? [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Menu Analytics</h2>

      {/* Top Selling Items */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Top Selling Items</h3>
        {topSelling.length === 0 ? (
          <p className="text-gray-500 text-sm">No order data yet</p>
        ) : (
          <div className="space-y-4">
            {topSelling.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category} · {item.orders} orders</p>
                </div>
                <p className="text-lg font-bold text-green-600">₦{item.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unavailable Items */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Unavailable Items</h3>
        {unavailable.length === 0 ? (
          <p className="text-gray-500 text-sm">All items are currently available</p>
        ) : (
          <div className="space-y-2">
            {unavailable.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded">
                <div>
                  <span className="text-red-800 dark:text-red-300 font-medium">{item.name}</span>
                  <span className="text-xs text-red-500 ml-2">{item.category}</span>
                </div>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Unavailable</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}