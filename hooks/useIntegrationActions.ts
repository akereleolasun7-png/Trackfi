import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectIntegration, syncIntegration, disconnectIntegration } from "@/lib/api/settings";
import { toast } from "sonner";

export function useConnectIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ provider, credentials }: { provider: string; credentials: string }) =>
      connectIntegration(provider, credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings-integrations"] });
      toast.success("Integration connected successfully! Syncing transactions...");

      setTimeout(() => {
        toast.info("Transactions are being synced in the background...");
      }, 2000);
    },
    
    onError: (error: Error) => toast.error(error.message ?? "Failed to connect integration"),
  });
}

export function useSyncIntegration() {
  return useMutation({
    mutationFn: (id: string) => syncIntegration(id),
    onSuccess: () => toast.success("Sync started! Transactions will update shortly."),
    onError: (error: Error) => toast.error(error.message ?? "Failed to sync integration"),
  });
}

export function useDisconnectIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => disconnectIntegration(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings-integrations"] });
      toast.success("Integration disconnected successfully");
    },
    onError: (error: Error) => toast.error(error.message ?? "Failed to disconnect integration"),
  });
}