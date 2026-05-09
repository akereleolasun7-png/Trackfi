import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { Providers } from "@/provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/sidebar";
import NavbarDashboard from "@/components/common/navbarDashboard";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user?.id)
    .maybeSingle();

  return {
    title: user 
    ? `${profile?.name || user.email} — Trackfi Settings` 
    : "Trackfi Settings",
    description: "Track your crypto portfolio in real time",
  };
}
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }
  const NAVBAR_HEIGHT = 20;

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <NavbarDashboard pageTitle="Settings" />
       
          <Providers>
            <div style={{ paddingTop: NAVBAR_HEIGHT }}>{children}</div>
          </Providers>
       
      </SidebarInset>
    </SidebarProvider>
  );
}
