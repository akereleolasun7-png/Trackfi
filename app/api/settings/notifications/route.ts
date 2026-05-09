import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [{ data: profile }, { data: pushSubs }] = await Promise.all([
    supabase.from("profiles")
      .select("email_notifications, weekly_report")
      .eq("id", user.id)
      .single(),
    supabase.from("push_subscriptions")
      .select("id")
      .eq("user_id", user.id)
      .eq("is_active", true)
  ]);

  return NextResponse.json({
    emailNotifications: profile?.email_notifications ?? true,
    weeklyReport: profile?.weekly_report ?? false,
    pushNotifications: (pushSubs?.length ?? 0) > 0,
  });
}