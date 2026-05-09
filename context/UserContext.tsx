"use client";

import { createContext, useContext, ReactNode } from "react";
import { User } from "@supabase/supabase-js";

export type MergedUser = User & {
  name?: string;
  image?: string;
  package_type?: string;
  preferred_currency?: string;
}

type UserContextType = {
  user: MergedUser | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: MergedUser | null;
}) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}