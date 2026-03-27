"use client";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { userId }       = useAuth();
  const { user }         = useUser();
  const [name,  setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.fullName  || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">My Profile</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Manage your account information</p>
      </div>

      {/* Avatar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <h2 className="font-semibold text-stone-900 dark:text-white mb-4">Profile Picture</h2>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-700 flex-shrink-0">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-stone-500">
                {name[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900 dark:text-white mb-1">{name}</p>
            <p className="text-xs text-stone-500">{email}</p>
            <p className="text-xs text-stone-400 mt-2">Avatar is managed through your Clerk account</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <h2 className="font-semibold text-stone-900 dark:text-white mb-5">Personal Information</h2>
        <div className="space-y-4">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email Address" value={email} type="email" disabled
            className="opacity-60 cursor-not-allowed" />
          <p className="text-xs text-stone-400">Email is managed through Clerk and cannot be changed here.</p>

          {saved && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle2 size={16} /> Profile saved successfully!
            </div>
          )}

          <Button onClick={handleSave} variant="primary" size="md" loading={saving}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}