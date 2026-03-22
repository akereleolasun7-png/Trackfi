import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { UserProvider } from "@/context/UserContext";
import InactiveAccount from "@/components/dashboard/staff/InactiveStaff";
import { Providers } from "@/provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/shared/sidebar"
import NavbarDashboard from "@/components/dashboard/shared/navbarDashboard"
export default async function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/admin/login");
  }

  const { data: staff , error:staffError } = await supabase
    .from('staff')
    .select('id,email, role, is_active')
    .eq('id', user.id)
    .single();

  if (staffError || !staff )  redirect("/admin/unauthorized");

  if (staff.role !== "admin" && staff.role !== "staff")   redirect("/admin/unauthorized");
  if (!staff.is_active) {
    return <InactiveAccount />;
  }
  const NAVBAR_HEIGHT = 84; // Reduced for better spacing
  const userRole = staff?.role || 'user'; 
    return (
      <SidebarProvider defaultOpen={false}>
      <AppSidebar userRole={userRole} />
      <SidebarInset>
        <NavbarDashboard user={user} pageTitle="Admin Dashboard"/>
        <UserProvider user={user} staff={staff}>
          <div style={{ paddingTop: NAVBAR_HEIGHT }}>
            <Providers>{children}</Providers>
          </div>
          
        </UserProvider>
      </SidebarInset>
      </SidebarProvider>
    )
}