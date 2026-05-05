import { useQuery } from "@tanstack/react-query";
import { fetchAlerts } from "@/lib/api/alerts";

export const useAlerts = () =>
  useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
    staleTime: 1000 * 60 * 2,
    refetchInterval: false,
    retry: false,
  });

