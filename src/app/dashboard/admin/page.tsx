"use client";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Users, UtensilsCrossed, Calendar, Star } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";

const bookingData = [
  { day: "Mon", bookings: 12 }, { day: "Tue", bookings: 19 },
  { day: "Wed", bookings: 15 }, { day: "Thu", bookings: 27 },
  { day: "Fri", bookings: 34 }, { day: "Sat", bookings: 48 },
  { day: "Sun", bookings: 39 },
];

const userGrowth = [
  { week: "W1", users: 120 }, { week: "W2", users: 180 },
  { week: "W3", users: 240 }, { week: "W4", users: 310 },
  { week: "W5", users: 390 }, { week: "W6", users: 480 },
];

const cuisineData = [
  { name: "Bengali",  value: 35 },
  { name: "Chinese",  value: 20 },
  { name: "Italian",  value: 18 },
  { name: "Japanese", value: 15 },
  { name: "Others",   value: 12 },
];

const COLORS = ["#E8593C", "#1D9E75", "#534AB7", "#BA7517", "#888780"];

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState({
    restaurants: 0, users: 0, bookings: 0, avgRating: 4.7,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/restaurants?limit=1").then((r) => r.json()),
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/bookings").then((r) => r.json()),
    ]).then(([rData, uData, bData]) => {
      setStats({
        restaurants: rData.total     || 0,
        users:       uData.users?.length || 0,
        bookings:    bData.bookings?.length || 0,
        avgRating:   4.7,
      });
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">Analytics</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Platform overview and statistics</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Restaurants" value={stats.restaurants} icon={<UtensilsCrossed size={18}/>} color="coral"  change="+4 this week"  positive />
        <StatsCard title="Total Users"        value={stats.users}       icon={<Users          size={18}/>} color="teal"   change="+12 this week" positive />
        <StatsCard title="Total Bookings"     value={stats.bookings}    icon={<Calendar       size={18}/>} color="purple" change="+8 today"      positive />
        <StatsCard title="Avg Rating"         value={stats.avgRating}   icon={<Star           size={18}/>} color="amber"  change="Excellent"     positive />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bar chart */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5">
          <h3 className="font-semibold text-stone-900 dark:text-white mb-4 text-sm">Bookings This Week</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bookingData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              />
              <Bar dataKey="bookings" fill="#E8593C" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5">
          <h3 className="font-semibold text-stone-900 dark:text-white mb-4 text-sm">User Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#1D9E75"
                strokeWidth={2.5}
                dot={{ fill: "#1D9E75", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie chart */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5">
        <h3 className="font-semibold text-stone-900 dark:text-white mb-4 text-sm">Bookings by Cuisine</h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={cuisineData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {cuisineData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2">
            {cuisineData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-stone-600 dark:text-stone-400">{item.name}</span>
                <span className="font-medium text-stone-900 dark:text-white ml-auto pl-4">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}