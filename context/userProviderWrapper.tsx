import { createClient } from "@/utils/supabase/server";
import { UserProvider, MergedUser } from "@/context/UserContext";

export async function UserProviderWrapper({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let mergedUser: MergedUser | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    mergedUser = {
      ...user,
      name: profile?.name,
      image: profile?.image,
      package_type: profile?.package_type,
      preferred_currency: profile?.preferred_currency ?? "USD",
    };
  }

  return (
    <UserProvider user={mergedUser}>
      {children}
    </UserProvider>
  );
}