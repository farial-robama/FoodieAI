"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [siteName, setSiteName] = useState("FoodieAI");
  const [contactEmail, setContactEmail] = useState("hello@foodieai.com");
  const [maxBookings, setMaxBookings] = useState("20");

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">Settings</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Platform configuration</p>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-5">
        <h2 className="font-semibold text-stone-900 dark:text-white">General Settings</h2>
        <Input label="Site Name"      value={siteName}      onChange={(e) => setSiteName(e.target.value)} />
        <Input label="Contact Email"  value={contactEmail}  onChange={(e) => setContactEmail(e.target.value)} />
        <Input label="Max Guests per Booking" value={maxBookings} onChange={(e) => setMaxBookings(e.target.value)} type="number" />

        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 size={16} /> Settings saved successfully!
          </div>
        )}
        <Button onClick={handleSave} variant="primary">Save Settings</Button>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <h2 className="font-semibold text-stone-900 dark:text-white mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20">
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">Clear all bookings</p>
            <p className="text-xs text-red-500 mt-0.5">This action cannot be undone</p>
          </div>
          <Button variant="danger" size="sm">Clear</Button>
        </div>
      </div>
    </div>
  );
}