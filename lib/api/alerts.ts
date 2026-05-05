import { mockAlertStats } from '@/lib/mock/alerts'
import { EnrichedAlert, AlertStats } from '@/types/alerts'
import { CreateAlertInput, UpdateAlertInput } from '@/types/alerts'
import { toast } from 'sonner'
export async function fetchAlerts(): Promise<EnrichedAlert[]> {
  const res = await fetch('/api/alerts')
  if (!res.ok) throw new Error('Failed to fetch alerts')
  return res.json()  
}

export async function createAlert(data: CreateAlertInput) {
  
   const res = await fetch(`/api/alerts/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  });
  if(!res.ok){
    toast.error('Failed to create Alert')
    return null;
  }
  toast.success('Alert created')
  return res.json();
}

export async function updateAlert(id: string, data: UpdateAlertInput) {
   const res = await fetch(`/api/alerts/${id}/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( data ),
  });
  if(!res.ok){
    toast.error('Failed to update alert')
    return null;
  }
  toast.success('Alert updated')
  return res.json();

}

export async function deleteAlert(id: string) {
   const res = await fetch(`/api/alerts/${id}/delete`, {
    method: 'DELETE', });
  if(!res.ok){
    toast.error('Failed to delete Alert')
    return false
  }
  toast.success('Alert deleted')
  return true
}

export async function toggleAlertStatus(id: string, status: 'active' | 'paused') {
  const res = await fetch(`/api/alerts/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if(!res.ok){
    toast.error('Failed to update alert status')
    return null;
  }
  toast.success(`Alert Toggle ${status} successfull`)
  return res.json();
  
}
