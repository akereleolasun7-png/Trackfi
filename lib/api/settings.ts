import { mockSettings } from "@/lib/mock/settings";
import {
  UpdateProfileInput,
  UpdateNotificationSettingsInput,
  UpdateSecuritySettingsInput,
} from "@/types/settings";

export async function fetchProfile() {
  const res = await fetch("/api/settings/profile");
  if (!res.ok) throw new Error("Failed to fetch profile");
  const data = await res.json();
  return data;
}
export async function updateProfileImage(image: string) {
  const res = await fetch("/api/settings/profile/image", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image }),
  });
  return res;
}
export async function updateProfile(data: UpdateProfileInput) {
  const res = await fetch("/api/settings/profile/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send profile data");
  return res
}

export async function fetchNotificationSettings() {
  const res = await fetch("/api/settings/notifications");
  if (!res.ok) throw new Error("Failed to fetch notification settings");
  return res.json();
}

export async function updateNotificationSettings(
  data: UpdateNotificationSettingsInput,
) {
   const res = await fetch("/api/settings/notifications/update",{
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(data),
   });
  if (!res.ok) throw new Error("Failed to update notification settings");
  return res.json();
}
export async function subscribeToPushNotifications(subscription: PushSubscription) {
  const res = await fetch("/api/user/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subscription }),
  });
  if (!res.ok) throw new Error("Failed to subscribe to push notifications");
  return res.json();
}
export async function updatePushNotificationSettings(
    data: { endpoint: string; is_active: boolean }
) {
   const res = await fetch("/api/user/push/update",{
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(data),
   });
  if (!res.ok) throw new Error("Failed to update notification settings");
  return res.json();
}


export async function fetchSecuritySettings() {
  // const res = await fetch('/api/settings/security')
  // if (!res.ok) throw new Error('Failed to fetch security settings')
  // return res.json()
  return mockSettings.security;
}

export async function updateSecuritySettings(
  data: UpdateSecuritySettingsInput,
) {
  // TODO: wire to /api/settings/security when backend is ready
  console.warn("updateSecuritySettings: not implemented", data);
  return mockSettings.security;
}

export async function fetchIntegrations() {
  const res = await fetch("/api/settings/integrations");
  if (!res.ok) throw new Error("Failed to fetch integrations");
  return res.json();
}

export async function connectIntegration(
  provider: string,
  credentials: string,
) {
  const res = await fetch("/api/settings/integrations/connect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, credentials }),
  });
  if (!res.ok) throw new Error("Failed to connect integration");
  return res.json();
}

export async function disconnectIntegration(integrationId: string) {
  const res = await fetch(
    `/api/settings/integrations/disconnect/${integrationId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!res.ok) throw new Error("Failed to disconnect integration");
  return res.json();
}

export async function syncIntegration(integrationId: string) {
  const res = await fetch(`/api/settings/integrations/sync/${integrationId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to sync integration");
  return res.json();
}
