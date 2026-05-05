"use client";

import React from "react";
import { useIntegrations } from "@/lib/query/settings";
import {
  useConnectIntegration,
  useSyncIntegration,
  useDisconnectIntegration,
} from "@/hooks/useIntegrationActions";
import { Zap, Check, Loader2 } from "lucide-react";
import { IntegrationCard } from "./integrationCard";
import { defaultIntegrations } from "@/lib/constants/Integrations";
import { Integration } from "@/types/settings";

export default function IntegrationsPage() {
  const { data: integrations, isLoading } = useIntegrations();

  const connect = useConnectIntegration();
  const sync = useSyncIntegration();
  const disconnect = useDisconnectIntegration();

  const integrationsData: Integration[] = integrations || defaultIntegrations;
  const connectedIntegrations = integrationsData.filter((i) => i.status === "connected");
  const availableIntegrations = integrationsData.filter((i) => i.status !== "connected");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-white/40" />
      </div>
    );
  }

  return (
    <div className="px-6 pb-10 min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Integrations</h1>
        <p className="text-white/60 text-sm md:text-base">
          Connect your exchange accounts to sync transactions and portfolio data.
        </p>
      </div>

      {/* Connected Integrations */}
      {connectedIntegrations.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Check className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-semibold">Connected Exchanges</h2>
            <span className="text-sm text-white/40">
              ({connectedIntegrations.length})
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {connectedIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.id ?? integration.provider}
                integration={integration}
                onConnect={(credentials) =>
                  connect.mutate({ provider: integration.provider, credentials })
                }
                onDisconnect={() => disconnect.mutate(integration.id!)}
                onSync={() => sync.mutate(integration.id!)}
                isSyncing={sync.isPending && sync.variables === integration.id}
                isDisconnecting={
                  disconnect.isPending && disconnect.variables === integration.id
                }
                isConnecting={connect.isPending &&
                  connect.variables?.provider === integration.provider
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Integrations */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Available Exchanges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {availableIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.provider}
              integration={integration}
              onConnect={(credentials) =>
                connect.mutate({ provider: integration.provider, credentials})
              }
              onSync={() => sync.mutate(integration.id!)}
              isSyncing={sync.isPending && sync.variables === integration.id}
              isConnecting={connect.isPending &&
                connect.variables?.provider === integration.provider
              }
            />
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
        <div className="flex gap-3">
          <Zap className="w-6 h-6 text-blue-400 shrink-0" />
          <div>
            <h3 className="font-semibold mb-2">How to Connect</h3>
            <ol className="text-sm text-white/60 space-y-1 list-decimal list-inside">
              <li>Click &quot;Connect&quot; on the exchange you want to integrate</li>
              <li>Enter your wallet address in the input field</li>
              <li>Click &quot;Send&quot; to connect and start syncing transactions</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}