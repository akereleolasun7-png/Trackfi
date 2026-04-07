export type AlertCondition = 'above' | 'below' | 'change'
export type AlertStatus = 'active' | 'paused'

export interface PriceAlert {
  id: string
  coin: string
  symbol: string
  condition: AlertCondition
  targetPrice: number
  lastPrice?: number
  status: AlertStatus
  createdAt: string
  triggeredRecently?: boolean
  deliveryChannels: {
    inApp: boolean
    email: boolean
  }
  emailAddress?: string
}

export interface AlertStats {
  total: number
  active: number
  paused: number
}

export interface CreateAlertInput {
  coin: string
  symbol: string
  condition: AlertCondition
  targetPrice: number
  deliveryChannels: {
    inApp: boolean
    email: boolean
  }
  emailAddress?: string
  status:string
}

export interface UpdateAlertInput {
  condition?: AlertCondition
  targetPrice?: number
  status?: AlertStatus
  deliveryChannels?: {
    inApp: boolean
    email: boolean
  }
  emailAddress?: string
}