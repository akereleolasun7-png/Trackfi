// lib/session.ts
import { SupabaseClient } from '@supabase/supabase-js';

export async function refreshSessionActivity(supabase: SupabaseClient, sessionId: string) {
  await supabase
    .from('table_sessions')
    .update({ last_activity: new Date().toISOString() })
    .eq('id', sessionId);
}