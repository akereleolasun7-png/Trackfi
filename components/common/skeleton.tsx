"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function UsersSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-32 h-10 rounded-lg" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {['User', 'Package', 'Role', 'Joined', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {Array.from({ length: count }).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="ml-4 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-6 w-16 rounded-full" /></td>
                  <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-6 w-12 rounded-full" /></td>
                  <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-6 rounded" />
                      <Skeleton className="h-6 w-6 rounded" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <Skeleton className="h-8 w-12 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
export function DashboardSkeleton() {
    return (
        <div className="pt-24 px-6 pb-10 min-h-screen text-white animate-pulse">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 h-28" />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl h-80" />
                <div className="bg-white/5 border border-white/10 rounded-2xl h-80" />
            </div>
        </div>
    )
}
export function WatchlistSkeleton() {
  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white animate-pulse">
      {/* stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 h-24" />
        ))}
      </div>
      {/* table card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="h-6 w-32 bg-white/10 rounded mb-6" />
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-white/10 shrink-0" />
              <div className="flex-1 h-4 bg-white/10 rounded" />
              <div className="w-20 h-4 bg-white/10 rounded" />
              <div className="w-16 h-4 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}