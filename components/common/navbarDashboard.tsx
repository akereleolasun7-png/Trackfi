"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Bell, MenuIcon, Link2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSidebarStore } from "@/store/useSidebarStore";
import { GlobalSearch } from "./searchBar";
interface NavbarProps {
  pageTitle?: string;
}

export default function NavbarDashboard({
  pageTitle = "Dashboard",
}: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { state, isMobile } = useSidebar();
  const sidebarWidth = state === "expanded" ? "16rem" : "3rem";
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { toggle } = useSidebarStore();
  const { toggleSidebar } = useSidebar();

  const handleToggle = () => {
    toggle(); // update Zustand (persists)
    toggleSidebar(); // update shadcn UI
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(target)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-30 h-20 flex items-center justify-between px-6 text-white transition-all duration-300
           ${
             scrolled
               ? "bg-background  backdrop-blur-md shadow-sm "
               : "bg-transparent"
           }
            `}
      style={{
        left: isMobile ? "0" : sidebarWidth,
        width: isMobile ? "100%" : `calc(100% - ${sidebarWidth})`,
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        <h1
          className={`text-xl font-bold capitalize text-primary ${pageTitle !== "Dashboard" ? "hidden sm:block" : ""}`}
        >
          {pageTitle}
        </h1>
      </div>
      <div className={`flex items-center gap-3 `}>
        {pageTitle === "Dashboard" ? "" : <GlobalSearch />}
      </div>
      {/* Right */}
      <div className="flex items-center gap-3">
        <Link href="/alerts">
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative cursor-pointer">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </Link>
        {pageTitle === "Dashboard" ? (
          <Link href="/settings/integrations">
            <Button className="bg-primary hover:bg-primary/90 text-black font-bold rounded-full px-5">
              <Link2 className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Connect Exchange</span>
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
