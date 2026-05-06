"use client";
import React, { useState } from "react";
import {
  useProfile,
  useNotificationSettings,
  useSecuritySettings,
  useIntegrations,
} from "@/lib/query/settings";
import { ProfileForm } from "./profileForm";
import { NotificationsForm } from "./notificationsForm";
import { SecurityForm } from "./securityForm";
import { User, Bell, Shield, Link2 } from "lucide-react";
import IntegrationsPage from "./integrationsPage";
import { SettingsSkeleton } from "@/components/common/skeleton";

type SettingsTab = "profile" | "notifications" | "security" | "integrations";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: notifications, isLoading: notificationsLoading } = useNotificationSettings();
  const { data: security, isLoading: securityLoading } = useSecuritySettings();
  const { data: integrations, isLoading: integrationsLoading } = useIntegrations();

    const isLoading =
    (activeTab === "profile" && profileLoading) ||
    (activeTab === "notifications" && notificationsLoading) ||
    (activeTab === "security" && securityLoading) ||
    (activeTab === "integrations" && integrationsLoading);

  
  if (isLoading) return <SettingsSkeleton />;

  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
        <p className="text-white/60 text-sm md:text-base">
          Manage your account preferences and security settings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="fixed  lg:bg-none bottom-0 left-0 right-0 z-40 lg:static lg:w-64 lg:bottom-auto lg:left-auto lg:right-auto lg:z-auto">
          <div className="grid grid-cols-4 lg:grid-cols-1 backdrop-blur-md shadow-sm bg-white/5 border border-white/10 rounded-t-2xl lg:rounded-2xl p-4 lg:sticky lg:top-24 gap-1 border-b lg:border-b">
            {[
              { id: "profile" as const, label: "Profile", icon: User },
              { id: "notifications" as const, label: "Notifications", icon: Bell },
              { id: "security" as const, label: "Security", icon: Shield },
              { id: "integrations" as const, label: "Integrations", icon: Link2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left cursor-pointer ${
                    activeTab === item.id
                      ? "bg-orange-500/20 border border-orange-500/30 text-orange-400"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
          
        {/* Main Content */}
        <div className="flex-1 pb-24 lg:pb-0">
          {activeTab === "profile" && profile && (
            <ProfileForm profile={profile} />
          )}
          {activeTab === "notifications" && notifications && (
            <NotificationsForm notifications={notifications} />
          )}
          {activeTab === "security" && security && (
            <SecurityForm security={security} />
          )}
          {activeTab === "integrations" && integrations && <IntegrationsPage />}
        </div>
      </div>
    </div>
  );
}
