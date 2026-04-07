"use client";

import React, { useState } from "react";
import { NotificationSettings } from "@/types/settings";
import { Button } from "@/components/ui/button";
import { updateNotificationSettings } from "@/lib/api/settings";
import { Bell, Mail, MessageSquare } from "lucide-react";

interface NotificationsFormProps {
  notifications: NotificationSettings;
}

export function NotificationsForm({ notifications }: NotificationsFormProps) {
  const [formData, setFormData] = useState({
    emailNotifications: notifications.emailNotifications,
    priceAlerts: notifications.priceAlerts,
    portfolioUpdates: notifications.portfolioUpdates,
    weeklyReport: notifications.weeklyReport,
    pushNotifications: notifications.pushNotifications,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (key: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateNotificationSettings(formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const notificationOptions = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive general notifications via email",
      icon: Mail,
    },
    {
      key: "priceAlerts",
      title: "Price Alerts",
      description: "Get notified when your alert triggers",
      icon: Bell,
    },
    {
      key: "portfolioUpdates",
      title: "Portfolio Updates",
      description: "Daily summary of your portfolio changes",
      icon: MessageSquare,
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
          const value = formData[option.key as keyof typeof formData];
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
                onClick={() =>
                  handleToggle(option.key as keyof typeof formData)
                }
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

      {/* Delivery Methods Info */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-6">
        <p className="text-xs text-white/60">
          <strong>Note:</strong> Notifications are delivered via your selected
          channels. Configure specific delivery methods in your notification
          settings.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-white/10">
        <button className="flex-1 px-4 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors font-semibold">
          Reset to Defaults
        </button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-black font-bold py-3 rounded-lg"
        >
          {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
