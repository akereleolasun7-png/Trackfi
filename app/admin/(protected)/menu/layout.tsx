import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import NavbarDashboard from "@/components/dashboard/shared/navbarDashboard";
export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();


  if (!user || error) {
    redirect("/admin/login");
  }
  return (
    <>
      <NavbarDashboard pageTitle="Menu Management" />
        <div>
          {children}
        </div>
    </>
  );
}
