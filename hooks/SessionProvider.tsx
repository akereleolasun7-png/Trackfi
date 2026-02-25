'use client';
import { useSessionActivity } from '@/hooks/useSessionActivity';
import { sessionsApi } from '@/lib/api/sessions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState, useCallback } from 'react';

interface SessionProviderProps {
  children: React.ReactNode;
  tableNumber: number;
}

export default function SessionProvider({ children, tableNumber }: SessionProviderProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSessionExpired = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    toast.error('Session Expired', {
      description: 'Starting a new session...',
      duration: 3000,
    });

    try {
      await sessionsApi.startSession(tableNumber); // ← start directly, no redirect needed
      router.refresh(); // ← just refresh current page with new session
    } catch {
      router.replace(`/menu/${tableNumber}`); // ← fallback if start fails
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, router, tableNumber]);

  const handleSessionInactive = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    toast.error('Session Inactive', {
      description: 'Starting a new session...',
      duration: 3000,
    });

    try {
      await sessionsApi.startSession(tableNumber);
      router.refresh();
    } catch {
      router.replace(`/menu/${tableNumber}`);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, router, tableNumber]);

  useSessionActivity({
    onSessionExpired: handleSessionExpired,
    onSessionInactive: handleSessionInactive,
    activityThrottle: 60 * 1000,
  });

  if (isRefreshing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">Refreshing your session...</p>
          <p className="text-sm text-gray-500 mt-2">Table {tableNumber}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}