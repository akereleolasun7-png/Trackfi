"use client"
import React from "react";
import { useAlerts } from "@/lib/query/alerts";
import { AlertFull } from "@/components/alerts/alertFull";
import AlertEmpty from "@/components/alerts/alertEmpty";
import { AlertFullSkeleton } from "@/components/common/skeleton";
import { toast } from "sonner";
import { useWatchlist } from "@/lib/query/watchlist";

export default function AlertsPage() {
  const { data: alerts = [], isLoading, isError } = useAlerts();
  const { data: watchlistData } = useWatchlist()
  React.useEffect(() => {
    if (isError) toast.error("Failed to load alerts");
  }, [isError]);

  if (isLoading) return <AlertFullSkeleton />;

  if (!alerts.length) return <AlertEmpty />;

  return <AlertFull alerts={alerts} watchListCoins={watchlistData?.coins ?? []}/>;
}
