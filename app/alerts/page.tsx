'use client'
import React from 'react'
import { useAlerts, useAlertStats } from '@/lib/query/alerts'
import { AlertFull } from '@/components/alerts/alertFull'
import AlertEmpty from '@/components/alerts/alertEmpty'
import { DashboardSkeleton } from '@/components/common/skeleton'
import { toast } from 'sonner'

export default function AlertsPage() {
  const { data: alerts = [], isLoading, isError } = useAlerts()
  const { data: stats, isLoading: statsLoading } = useAlertStats()

  React.useEffect(() => {
    if (isError) toast.error('Failed to load alerts')
  }, [isError])

  if (isLoading || statsLoading) return <DashboardSkeleton />

  if (!alerts.length || !stats) return <AlertEmpty />

  return <AlertFull alerts={alerts} stats={stats} />
}