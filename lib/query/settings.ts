import { useQuery } from "@tanstack/react-query";
import {
  
  fetchProfile,
  fetchNotificationSettings,
  fetchSecuritySettings,
  fetchIntegrations,
} from "@/lib/api/settings";



export const useProfile = (options?: { enabled?: boolean } ) =>
  useQuery({
    queryKey: ["settings-profile"],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 3,
    retry: true,
    enabled: options?.enabled ?? true,
  });

export const useNotificationSettings = (options?: { enabled?: boolean } ) =>
  useQuery({
    queryKey: ["settings-notifications"],
    queryFn: fetchNotificationSettings,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 3,
    retry: true,
    enabled: options?.enabled ?? true,
  });

export const useSecuritySettings = (options?: { enabled?: boolean } ) =>
  useQuery({
    queryKey: ["settings-security"],
    queryFn: fetchSecuritySettings,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 3,
    retry: true,
    enabled: options?.enabled ?? true,  
  });

export const useIntegrations = (options?: { enabled?: boolean } ) =>
  useQuery({
    queryKey: ["settings-integrations"],
    queryFn: fetchIntegrations,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 3,
    retry: true,
    enabled: options?.enabled ?? true,
  });
