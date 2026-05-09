export type NotificationChannel = "email" | "push" | "sms";
export type CurrencyPreference = "USD" | "EUR" | "GBP" | "JPY" | "AUD";
export type IntegrationProvider =
  | "solana"
  | "ethereum"
  | "bitcoin"
  | "metamask"
export type IntegrationStatus = "connected" | "disconnected" | "error" | "coming_soon";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  preferred_currency: CurrencyPreference;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  weeklyReport: boolean;
  pushNotifications: boolean;
  notificationChannels: NotificationChannel[];
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod?: "authenticator" | "sms" | "email";
  loginAlerts: boolean;
  ipWhitelist: boolean;
  whitelistedIPs: string[];
  sessionTimeout: number;
}

export interface Integration {
  id: string | null     
  provider: IntegrationProvider
  name: string
  status: IntegrationStatus
  connectedAt?: string | null
  lastSyncedAt?: string | null
  description: string
  icon?: string
  walletAddress?: string | null
}
export interface AppSettings {
  profile: UserProfile;
  notifications: NotificationSettings;
  security: SecuritySettings;
  integrations: Integration[];
}

export interface UpdateProfileInput {
  name?: string;
  photo?: string;
  preferredCurrency?: CurrencyPreference;
}

export interface UpdateNotificationSettingsInput {
  emailNotifications?: boolean;
  priceAlerts?: boolean;
  portfolioUpdates?: boolean;
  weeklyReport?: boolean;
  pushNotifications?: boolean;
  notificationChannels?: NotificationChannel[];
}

export interface UpdateSecuritySettingsInput {
  twoFactorEnabled?: boolean;
  twoFactorMethod?: "authenticator" | "sms" | "email";
  loginAlerts?: boolean;
  ipWhitelist?: boolean;
  sessionTimeout?: number;
}
