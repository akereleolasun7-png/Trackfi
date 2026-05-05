export type AlertCondition = 'above' | 'below' | 'change'
export type AlertStatus = 'active' | 'paused'

export interface PriceAlert {
  id: string
  coin_id: string
  condition: AlertCondition
  target_price: number
  last_price?: number
  status: AlertStatus
  created_at: string
  triggered_recently?: boolean | null
  in_app: boolean
  email: boolean
  email_address?: string | null
}
export interface EnrichedAlert extends PriceAlert {
  coin_name: string
  coin_symbol: string
  coin_image: string
  current_price: number | null
}

export interface AlertStats {
  total: number
  active: number
  paused: number
}

export interface CreateAlertInput {
  coin_id: string
  condition: AlertCondition
  target_price: number
  in_app: boolean
  email: boolean
  email_address?: string
  status:AlertStatus;
}

export interface UpdateAlertInput {
  condition?: AlertCondition
  target_price?: number
  status?: AlertStatus
  in_app?: boolean
  email?: boolean
  email_address?: string
}