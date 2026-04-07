"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types/settings";
import { CurrencyPreference } from "@/types/settings";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/api/settings";
import { User, CheckCircle } from "lucide-react";

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    prefCurrency: CurrencyPreference;
  }>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone || "",
    bio: profile.bio || "",
    prefCurrency: profile.preferredCurrency,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      bio: formData.bio,
      preferredCurrency: formData.prefCurrency,
    });
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <p className="text-sm text-white/60 mb-3">
              PNG, JPG or GIF. Max 2MB.
            </p>
            <div className="flex gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-4 py-2 rounded-lg">
                Change photo
              </Button>
              <Button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-lg">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Public Profile */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-6">Public Profile</h3>
        <p className="text-white/40 text-sm mb-6">
          Update your photo and personal details here.
        </p>

        <div className="space-y-4 mb-6">
          {/* First Name */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block flex items-center gap-2">
              Email Address
              {profile.emailVerified && (
                <span className="flex items-center gap-1 text-green-400 text-[10px]">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              )}
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/60 placeholder-white/40 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
            />
          </div>

          {/* Preferred Currency */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest mb-2 block">
              Preferred Currency
            </label>
            <select
              name="prefCurrency"
              value={formData.prefCurrency}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <option value="USD" className="bg-[#111]">
                USD - United States Dollar
              </option>
              <option value="EUR" className="bg-[#111]">
                EUR - Euro
              </option>
              <option value="GBP" className="bg-[#111]">
                GBP - British Pound
              </option>
              <option value="JPY" className="bg-[#111]">
                JPY - Japanese Yen
              </option>
              <option value="AUD" className="bg-[#111]">
                AUD - Australian Dollar
              </option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-white/10">
          <button className="flex-1 px-4 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors font-semibold">
            Discard Changes
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
    </div>
  );
}
