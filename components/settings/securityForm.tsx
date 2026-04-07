"use client";

import React, { useState } from "react";
import { SecuritySettings } from "@/types/settings";
import { Button } from "@/components/ui/button";
import { updateSecuritySettings } from "@/lib/api/settings";
import { Shield, AlertCircle } from "lucide-react";

interface SecurityFormProps {
  security: SecuritySettings;
}

export function SecurityForm({ security }: SecurityFormProps) {
  const [formData, setFormData] = useState<{
    twoFactorEnabled: boolean;
    twoFactorMethod: "authenticator" | "sms" | "email";
    loginAlerts: boolean;
    ipWhitelist: boolean;
    sessionTimeout: number;
  }>({
    twoFactorEnabled: security.twoFactorEnabled,
    twoFactorMethod: security.twoFactorMethod || "authenticator",
    loginAlerts: security.loginAlerts,
    ipWhitelist: security.ipWhitelist,
    sessionTimeout: security.sessionTimeout,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (key: "twoFactorEnabled" | "loginAlerts") => {
    setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateSecuritySettings({
      twoFactorEnabled: formData.twoFactorEnabled,
      twoFactorMethod: formData.twoFactorMethod,
      loginAlerts: formData.loginAlerts,
      sessionTimeout: parseInt(formData.sessionTimeout.toString()),
    });
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Two Factor Authentication */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-400" />
              Two-Factor Authentication
            </h3>
            <p className="text-white/40 text-sm mt-2">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={() => handleToggle("twoFactorEnabled")}
            className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${
              formData.twoFactorEnabled ? "bg-green-500" : "bg-white/20"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                formData.twoFactorEnabled ? "translate-x-4" : ""
              }`}
            />
          </button>
        </div>

        {formData.twoFactorEnabled && (
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest mb-3 block">
                Authentication Method
              </label>
              <select
                name="twoFactorMethod"
                value={formData.twoFactorMethod}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <option value="authenticator" className="bg-[#111]">
                  Authenticator App
                </option>
                <option value="sms" className="bg-[#111]">
                  SMS
                </option>
                <option value="email" className="bg-[#111]">
                  Email
                </option>
              </select>
            </div>
            <p className="text-xs text-white/40 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              {formData.twoFactorMethod === "authenticator" &&
                "Use an authenticator app like Google Authenticator or Microsoft Authenticator"}
              {formData.twoFactorMethod === "sms" &&
                "We will send a code to your registered phone number"}
              {formData.twoFactorMethod === "email" &&
                "We will send a code to your email address"}
            </p>
          </div>
        )}
      </div>

      {/* Login Security */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-6">Login Security</h3>

        <div className="space-y-4 mb-6">
          {/* Login Alerts */}
          <div className="flex items-start justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/8 transition-colors">
            <div>
              <p className="font-semibold text-sm">Login Alerts</p>
              <p className="text-xs text-white/40 mt-1">
                Get notified of new login attempts
              </p>
            </div>
            <button
              onClick={() => handleToggle("loginAlerts")}
              className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${
                formData.loginAlerts ? "bg-orange-500" : "bg-white/20"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  formData.loginAlerts ? "translate-x-4" : ""
                }`}
              />
            </button>
          </div>

          {/* Session Timeout */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-3 block">
              Session Timeout
            </label>
            <select
              name="sessionTimeout"
              value={formData.sessionTimeout}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <option value="15" className="bg-[#111]">
                15 minutes
              </option>
              <option value="30" className="bg-[#111]">
                30 minutes
              </option>
              <option value="60" className="bg-[#111]">
                1 hour
              </option>
              <option value="120" className="bg-[#111]">
                2 hours
              </option>
              <option value="240" className="bg-[#111]">
                4 hours
              </option>
              <option value="480" className="bg-[#111]">
                8 hours
              </option>
            </select>
            <p className="text-xs text-white/40 mt-2">
              Your session will automatically log out after this period of
              inactivity
            </p>
          </div>
        </div>
      </div>

      {/* Active Sessions Warning */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />
        <p className="text-xs text-white/60">
          <strong>Security Note:</strong> Changes to your security settings will
          require you to log in again.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6">
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
