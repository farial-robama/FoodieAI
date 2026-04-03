"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, Circle, AlertTriangle, UtensilsCrossed,
  Users, Calendar, ArrowRight, Wifi, Mail, CreditCard, ShieldCheck,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import Badge from "@/components/ui/Badge";

interface ActivityItem {
  id: string;
  type: "booking" | "user" | "restaurant" | "report";
  title: string;
  subtitle: string;
  time: string;
  initials: string;
  color: "blue" | "teal" | "coral" | "amber";
}

interface SystemService {
  name: string;
  status: "operational" | "degraded" | "down";
  icon: React.ReactNode;
}

interface AdminTask {
  id: string;
  label: string;
  done: boolean;
  href?: string;
}

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: "1", type: "booking",    title: "New booking",          subtitle: "Sara R. → Spice Garden",      time: "2m ago",  initials: "SR", color: "blue"  },
  { id: "2", type: "restaurant", title: "Restaurant added",     subtitle: "The Olive Branch pending",    time: "18m ago", initials: "RE", color: "teal"  },
  { id: "3", type: "report",     title: "Content report",       subtitle: "Inappropriate review flagged", time: "1h ago",  initials: "!",  color: "coral" },
  { id: "4", type: "user",       title: "New user registered",  subtitle: "James L. joined platform",    time: "3h ago",  initials: "JL", color: "blue"  },
  { id: "5", type: "booking",    title: "Booking cancelled",    subtitle: "Rina M. → Dhanmondi Grill",  time: "5h ago",  initials: "RM", color: "amber" },
];

const SYSTEM_SERVICES: SystemService[] = [
  { name: "Booking service",     status: "operational", icon: <Calendar  size={14} /> },
  { name: "User auth",           status: "operational", icon: <ShieldCheck size={14} /> },
  { name: "Email notifications", status: "degraded",    icon: <Mail      size={14} /> },
  { name: "Payment gateway",     status: "operational", icon: <CreditCard size={14} /> },
  { name: "API / connectivity",  status: "operational", icon: <Wifi      size={14} /> },
];

const INITIAL_TASKS: AdminTask[] = [
  { id: "1", label: "Review new restaurant listings",    done: true,  href: "/dashboard/admin/restaurants" },
  { id: "2", label: "Approve 4 pending restaurants",     done: false, href: "/dashboard/admin/restaurants" },
  { id: "3", label: "Respond to flagged review",         done: false, href: "/dashboard/admin/reports"     },
  { id: "4", label: "Export monthly booking report",     done: false, href: "/dashboard/admin/bookings"    },
  { id: "5", label: "Update platform terms of service",  done: true                                        },
];

const avatarColors: Record<string, string> = {
  blue:  "bg-blue-50   text-blue-700  dark:bg-blue-900/40  dark:text-blue-300",
  teal:  "bg-teal-50   text-teal-700  dark:bg-teal-900/40  dark:text-teal-300",
  coral: "bg-red-50    text-red-600   dark:bg-red-900/40   dark:text-red-300",
  amber: "bg-amber-50  text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const statusConfig = {
  operational: { label: "Operational", dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
  degraded:    { label: "Degraded",    dot: "bg-amber-400",   text: "text-amber-600 dark:text-amber-400"     },
  down:        { label: "Down",        dot: "bg-red-500",     text: "text-red-600 dark:text-red-400"         },
};

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({ restaurants: 0, users: 0, bookings: 0, pending: 4 });
  const [tasks, setTasks] = useState<AdminTask[]>(INITIAL_TASKS);

  useEffect(() => {
    Promise.all([
      fetch("/api/restaurants?limit=1").then((r) => r.json()),
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/bookings").then((r) => r.json()),
    ])
      .then(([rData, uData, bData]) => {
        setStats({
          restaurants: rData.total            || 0,
          users:       uData.users?.length    || 0,
          bookings:    bData.bookings?.length || 0,
          pending:     4,
        });
      })
      .catch(() => {});
  }, []);

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const allOk = SYSTEM_SERVICES.every((s) => s.status === "operational");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">Overview</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
          Quick summary of what needs your attention
        </p>
      </div>

      {/* Top KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Platform health"
          value={allOk ? "Good" : "Issues"}
          icon={<ShieldCheck size={18} />}
          color="teal"
          change={allOk ? "All systems up" : "Check status"}
          positive={allOk}
        />
        <StatsCard
          title="Pending approvals"
          value={stats.pending}
          icon={<UtensilsCrossed size={18} />}
          color="amber"
          change="Needs review"
          positive={false}
        />
        <StatsCard
          title="Total restaurants"
          value={stats.restaurants}
          icon={<UtensilsCrossed size={18} />}
          color="coral"
          change="+4 this week"
          positive
        />
        <StatsCard
          title="Total users"
          value={stats.users}
          icon={<Users size={18} />}
          color="purple"
          change="+12 this week"
          positive
        />
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left column */}
        <div className="space-y-5">
          {/* Recent activity */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-semibold text-stone-900 dark:text-white text-sm">Recent activity</h2>
              <Link
                href="/dashboard/admin/bookings"
                className="text-xs flex items-center gap-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
              >
                View all <ArrowRight size={11} />
              </Link>
            </div>
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {MOCK_ACTIVITY.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColors[item.color]}`}>
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-xs text-stone-400 truncate">{item.subtitle}</p>
                  </div>
                  <span className="text-xs text-stone-400 flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System status */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between p-5 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-semibold text-stone-900 dark:text-white text-sm">System status</h2>
              {!allOk && (
                <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                  <AlertTriangle size={12} /> Issues detected
                </span>
              )}
            </div>
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {SYSTEM_SERVICES.map((svc) => {
                const cfg = statusConfig[svc.status];
                return (
                  <div key={svc.name} className="flex items-center gap-3 px-5 py-3">
                    <span className="text-stone-400">{svc.icon}</span>
                    <span className="flex-1 text-sm text-stone-700 dark:text-stone-300">{svc.name}</span>
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span className={`text-xs font-medium ${cfg.text}`}>{cfg.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Admin tasks */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
            <div className="p-5 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-semibold text-stone-900 dark:text-white text-sm">Admin tasks</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                {tasks.filter((t) => t.done).length}/{tasks.length} completed
              </p>
            </div>
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.done ? (
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Circle size={16} className="text-stone-300 dark:text-stone-600 flex-shrink-0" />
                  )}
                  <span className={`flex-1 text-sm ${task.done ? "line-through text-stone-400" : "text-stone-700 dark:text-stone-300"}`}>
                    {task.label}
                  </span>
                  {!task.done && task.href && (
                    <Link
                      href={task.href}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs flex items-center gap-0.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                    >
                      Go <ArrowRight size={10} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
            <div className="p-5 border-b border-stone-200 dark:border-stone-800">
              <h2 className="font-semibold text-stone-900 dark:text-white text-sm">Quick actions</h2>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              {[
                { label: "Add restaurant",   href: "/dashboard/admin/restaurants/new", icon: <UtensilsCrossed size={14} /> },
                { label: "Manage users",     href: "/dashboard/admin/users",           icon: <Users           size={14} /> },
                { label: "View bookings",    href: "/dashboard/admin/bookings",        icon: <Calendar        size={14} /> },
                { label: "Full analytics",   href: "/dashboard/admin/analytics",       icon: <ArrowRight      size={14} /> },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors font-medium"
                >
                  <span className="text-stone-400">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}