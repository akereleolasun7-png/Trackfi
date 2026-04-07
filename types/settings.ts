export type NotificationChannel = "email" | "push" | "sms";
export type CurrencyPreference = "USD" | "EUR" | "GBP" | "JPY" | "AUD";
export type IntegrationProvider =
  | "coinbase"
  | "kraken"
  | "binance"
  | "ftx"
  | "gemini";
export type IntegrationStatus = "connected" | "disconnected" | "error";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  photo?: string;
  bio?: string;
  preferredCurrency: CurrencyPreference;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  priceAlerts: boolean;
  portfolioUpdates: boolean;
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
  sessionTimeout: number; // in minutes
}

export interface Integration {
  id: string;
  provider: IntegrationProvider;
  name: string;
  status: IntegrationStatus;
  connectedAt?: string;
  lastSyncedAt?: string;
  isPrimary?: boolean;
  description: string;
  icon?: string;
}

export interface AppSettings {
  profile: UserProfile;
  notifications: NotificationSettings;
  security: SecuritySettings;
  integrations: Integration[];
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  photo?: string;
  bio?: string;
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
