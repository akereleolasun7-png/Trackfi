import { useQuery } from "@tanstack/react-query";
import { fetchAlerts, fetchAlertStats } from "@/lib/api/alerts";

export const useAlerts = () =>
  useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
    staleTime: 1000 * 60 * 2,
    refetchInterval: false,
    retry: false,
  });

export const useAlertStats = () =>
  useQuery({
    queryKey: ["alert-stats"],
    queryFn: fetchAlertStats,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    retry: false,
  });
