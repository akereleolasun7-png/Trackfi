import { mockAlerts, mockAlertStats } from '@/lib/mock/alerts'
import { PriceAlert, AlertStats } from '@/types/alerts'
import { CreateAlertInput, UpdateAlertInput } from '@/types/alerts'
export async function fetchAlerts(): Promise<PriceAlert[]> {
  // const res = await fetch('/api/alerts')
  // if (!res.ok) throw new Error('Failed to fetch alerts')
  // return res.json()  
  return mockAlerts
}

export async function fetchAlertStats():Promise<AlertStats> {
  // const res = await fetch('/api/alerts/stats')
  // if (!res.ok) throw new Error('Failed to fetch alert stats')
  // return res.json()
  return mockAlertStats
}

// export async function fetchAlertCins():Promise<AlertStats> {
//   // const res = await fetch('/api/alerts/stats')
//   // if (!res.ok) throw new Error('Failed to fetch alert stats')
//   // return res.json()
//   return mockAlertStats
// }


export async function createAlert(data: CreateAlertInput) {
  // TODO: wire to /api/alerts when backend is ready
  console.warn('createAlert: not implemented', data)
  return null
}

export async function updateAlert(id: string, data: UpdateAlertInput) {
  // TODO: wire to /api/alerts/[id] when backend is ready
  console.warn('updateAlert: not implemented', id, data)
  return null
}

export async function deleteAlert(id: string) {
  // TODO: wire to /api/alerts/[id] when backend is ready
  console.warn('deleteAlert: not implemented', id)
  return null
}

export async function toggleAlertStatus(id: string, status: 'active' | 'paused') {
  // TODO: wire to /api/alerts/[id]/status when backend is ready
  console.warn('toggleAlertStatus: not implemented', id, status)
  return null
}
