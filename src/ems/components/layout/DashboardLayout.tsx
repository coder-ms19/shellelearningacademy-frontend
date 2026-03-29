import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "@/components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 pt-16">
      <Navbar
        onToggleSidebar={() => {
          if (window.innerWidth < 768) {
            setMobileOpen(true);
          } else {
            setCollapsed(!collapsed);
          }
        }}
      />
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content — shifts right on desktop based on sidebar width */}
      <div
        className={`transition-all duration-300 ${collapsed ? "md:pl-16" : "md:pl-64"
          }`}
      >
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
