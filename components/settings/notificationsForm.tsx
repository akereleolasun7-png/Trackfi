"use client";
import React, { useState, useEffect } from "react";
import { NotificationSettings } from "@/types/settings";
import {
  updateNotificationSettings,
  updatePushNotificationSettings,
  subscribeToPushNotifications,
} from "@/lib/api/settings";
import { Bell, Mail } from "lucide-react";
import { toast } from "sonner";

interface NotificationsFormProps {
  notifications: NotificationSettings;
}

export function NotificationsForm({ notifications }: NotificationsFormProps) {
  const [emailNotifications, setEmailNotifications] = useState(
    notifications.emailNotifications,
  );
  const [weeklyReport, setWeeklyReport] = useState(notifications.weeklyReport);
  const [pushNotifications, setPushNotifications] = useState(
    notifications.pushNotifications,
  );

  useEffect(() => {
    const checkCurrentBrowser = async () => {
      if (!("serviceWorker" in navigator)) {
        setPushNotifications(false);
        return;
      }
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setPushNotifications(!!subscription);
    };
    checkCurrentBrowser();
  }, []);

  const handleToggle = async (key: string) => {
    if (key === "emailNotifications") {
      const newValue = !emailNotifications;
      setEmailNotifications(newValue);
      try {
        await updateNotificationSettings({ emailNotifications: newValue });
      } catch {
        setEmailNotifications(!newValue);
        toast.error("Failed to update");
      }
    } else if (key === "weeklyReport") {
      const newValue = !weeklyReport;
      setWeeklyReport(newValue);
      try {
        await updateNotificationSettings({ weeklyReport: newValue });
      } catch {
        setWeeklyReport(!newValue);
        toast.error("Failed to update");
      }
    } else if (key === "pushNotifications") {
      const newValue = !pushNotifications;
      setPushNotifications(newValue);
      try {
        if (newValue) {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            toast.error("Permission denied");
            setPushNotifications(false);
            return;
          }
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          });
          await subscribeToPushNotifications(subscription);
        } else {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          if (!subscription) return;
          await subscription.unsubscribe();
          await updatePushNotificationSettings({
            endpoint: subscription.endpoint,
            is_active: false,
          });
        }
      } catch {
        setPushNotifications(!newValue);
        toast.error("Failed to update push notifications");
      }
    }
  };

  const notificationOptions = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive general notifications via email",
      icon: Mail,
    },
    {
      key: "weeklyReport",
      title: "Weekly Report",
      description: "Comprehensive weekly portfolio analysis",
      icon: Mail,
    },
    {
      key: "pushNotifications",
      title: "Push Notifications",
      description: "Real-time notifications on your device",
      icon: Bell,
    },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-2">Notification Preferences</h3>
      <p className="text-white/40 text-sm mb-6">
        Choose how and when you want to be notified about your accounts and
        alerts.
      </p>

      <div className="space-y-4 mb-8">
        {notificationOptions.map((option) => {
          const Icon = option.icon;
          const value =
            option.key === "emailNotifications"
              ? emailNotifications
              : option.key === "weeklyReport"
                ? weeklyReport
                : pushNotifications;
          return (
            <div
              key={option.key}
              className="flex items-start justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/8 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{option.title}</p>
                  <p className="text-xs text-white/40 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(option.key)}
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ml-4 ${
                  value ? "bg-orange-500" : "bg-white/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    value ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-white/60">
          <strong>Note:</strong> Notifications are delivered via your selected
          channels. Configure specific delivery methods in your notification
          settings.
        </p>
      </div>
    </div>
  );
}