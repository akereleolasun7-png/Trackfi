"use client";

import React from "react";
import { Integration } from "@/types/settings";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2, AlertCircle, CheckCircle } from "lucide-react";

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: () => void;
  onSync?: () => void;
  onDisconnect?: () => void;
  isSyncing?: boolean;
}

export function IntegrationCard({
  integration,
  onConnect,
  onSync,
  onDisconnect,
  isSyncing,
}: IntegrationCardProps) {
  const getStatusColor = () => {
    switch (integration.status) {
      case "connected":
        return "text-green-400";
      case "error":
        return "text-red-400";
      default:
        return "text-white/40";
    }
  };

  const getStatusIcon = () => {
    switch (integration.status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const isConnected = integration.status === "connected";

  return (
    <div
      className={`border rounded-2xl p-6 transition-all ${
        isConnected
          ? "bg-green-500/5 border-green-500/20"
          : integration.status === "error"
            ? "bg-red-500/5 border-red-500/20"
            : "bg-white/5 border-white/10 hover:bg-white/8"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-xl">
            {integration.icon}
          </div>
          <div>
            <h3 className="font-semibold">{integration.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              {getStatusIcon()}
              <span
                className={`text-xs uppercase tracking-widest ${getStatusColor()}`}
              >
                {integration.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/60 mb-4">{integration.description}</p>

      {/* Connection Details */}
      {isConnected && (
        <div className="bg-white/5 rounded-lg p-3 mb-4 text-xs text-white/40 space-y-1 border border-white/10">
          <p>
            <strong>Connected:</strong>{" "}
            {integration.connectedAt
              ? new Date(integration.connectedAt).toLocaleDateString()
              : "Unknown"}
          </p>
          <p>
            <strong>Last Sync:</strong>{" "}
            {integration.lastSyncedAt
              ? new Date(integration.lastSyncedAt).toLocaleDateString()
              : "Never"}
          </p>
          {integration.isPrimary && (
            <p>
              <span className="text-green-400">✓ Primary integration</span>
            </p>
          )}
        </div>
      )}

      {/* Error Message */}
      {integration.status === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-xs text-red-400 flex gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Connection failed. Please reconnect your account.</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!isConnected ? (
          <Button
            onClick={onConnect}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 rounded-lg"
          >
            Connect
          </Button>
        ) : (
          <>
            <Button
              onClick={onSync}
              disabled={isSyncing}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`}
              />
              {isSyncing ? "Syncing..." : "Sync"}
            </Button>
            <button
              onClick={onDisconnect}
              className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
