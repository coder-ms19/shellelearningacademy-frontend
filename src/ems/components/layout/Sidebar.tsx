import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ListTodo,
  FileText,
  Target,
  DollarSign,
  Wallet,
  Calendar,
  BarChart3,
  Trophy,
  Bell,
  Settings,
  GraduationCap,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/ems/lib/utils";
import { useState } from "react";
import { useSelector } from "react-redux";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/ems", roles: ["Super Admin", "Manager"] },
  { icon: Users, label: "Employees", path: "/ems/employees", roles: ["Super Admin", "Manager"] },
  // { icon: CalendarCheck, label: "Attendance", path: "/ems/attendance", roles: ["Super Admin", "Manager"] },
  // { icon: ListTodo, label: "Tasks & Workflow", path: "/ems/tasks", roles: ["Super Admin", "Manager"] },
  // { icon: FileText, label: "Daily Reports", path: "/ems/reports", roles: ["Super Admin", "Manager"] },
  { icon: Target, label: "Leads & Sales", path: "/ems/leads", roles: ["Super Admin", "Manager", "Employee"] },
  { icon: DollarSign, label: "Targets & Commissions", path: "/ems/targets", roles: ["Super Admin", "Manager"] },
  // { icon: Wallet, label: "Payroll & Salary", path: "/ems/payroll", roles: ["Super Admin", "Manager"] },
  // { icon: Calendar, label: "Leaves", path: "/ems/leaves", roles: ["Super Admin", "Manager"] },
  // { icon: BarChart3, label: "Performance & Reports", path: "/ems/performance", roles: ["Super Admin", "Manager"] },
  // { icon: Trophy, label: "Achievements", path: "/ems/achievements", roles: ["Super Admin", "Manager"] },
  // { icon: Bell, label: "Notifications", path: "/ems/notifications", roles: ["Super Admin", "Manager"] },
  // { icon: Settings, label: "Settings", path: "/ems/settings", roles: ["Super Admin", "Manager"] },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  // @ts-ignore
  const { user } = useSelector((state: any) => state.auth);

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.accountType)
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col animate-fade-in">
              <span className="font-bold text-foreground text-sm leading-tight">
                Shell E-Learning
              </span>
              <span className="text-xs text-muted-foreground">Academy</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
        <ul className="space-y-1">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "nav-item",
                    isActive && "nav-item-active",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  {!collapsed && (
                    <span className="text-sm truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
