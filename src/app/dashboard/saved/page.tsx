"use client";
export default function SavedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">Saved Restaurants</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Your favourite places</p>
      </div>
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-12 text-center">
        <p className="text-stone-400 text-sm">No saved restaurants yet</p>
      </div>
    </div>
  );
}