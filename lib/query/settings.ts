import { useQuery } from "@tanstack/react-query";
import {
  fetchSettings,
  fetchProfile,
  fetchNotificationSettings,
  fetchSecuritySettings,
  fetchIntegrations,
} from "@/lib/api/settings";

export const useSettings = () =>
  useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    retry: false,
  });

export const useProfile = () =>
  useQuery({
    queryKey: ["settings-profile"],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    retry: false,
  });

export const useNotificationSettings = () =>
  useQuery({
    queryKey: ["settings-notifications"],
    queryFn: fetchNotificationSettings,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    retry: false,
  });

export const useSecuritySettings = () =>
  useQuery({
    queryKey: ["settings-security"],
    queryFn: fetchSecuritySettings,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    retry: false,
  });

export const useIntegrations = () =>
  useQuery({
    queryKey: ["settings-integrations"],
    queryFn: fetchIntegrations,
    staleTime: 1000 * 60 * 2,
    refetchInterval: false,
    retry: false,
  });
