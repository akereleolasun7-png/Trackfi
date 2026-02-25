'use client';

import { useEffect, useRef } from 'react';
import { sessionsApi } from '@/lib/api/sessions';
import { useQuery, useMutation } from '@tanstack/react-query';

interface UseSessionActivityOptions {
  onSessionExpired?: () => void;
  onSessionInactive?: () => void;
  activityThrottle?: number;
}

export function useSessionActivity({
  onSessionExpired,
  onSessionInactive,
  activityThrottle = 60 * 1000,
}: UseSessionActivityOptions = {}) {

  const lastUpdateRef = useRef(0);

  // 🔹 Validate session (only for page load / manual checks)
  const { refetch: validate } = useQuery({
    queryKey: ['session', 'validate'],
    queryFn: sessionsApi.validateSession,
    enabled: false,
    retry: false,
  });

  // 🔹 Heartbeat mutation
  const heartbeat = useMutation({
    mutationFn: sessionsApi.heartbeat,
    onError: (error: Error) => {
      if (error.message === 'Session expired') {
        onSessionExpired?.();
      } else if (error.message === 'Session inactive') {
        onSessionInactive?.();
      }
    },
  });

  // 🔥 On mount → validate once
  useEffect(() => {
    validate();
  }, [validate]);

  // 🔥 Activity tracking → heartbeat only
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

    const handleActivity = () => {
      const now = Date.now();

      if (now - lastUpdateRef.current > activityThrottle) {
        heartbeat.mutate();
        lastUpdateRef.current = now;
      }
    };

    events.forEach(event =>
      window.addEventListener(event, handleActivity, { passive: true })
    );

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [activityThrottle, heartbeat]);
}