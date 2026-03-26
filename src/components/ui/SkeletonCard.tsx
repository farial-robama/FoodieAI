export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 animate-pulse">
      <div className="h-48 bg-stone-200 dark:bg-stone-700" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-stone-200 dark:bg-stone-700" />
          <div className="h-5 w-12 rounded-full bg-stone-200 dark:bg-stone-700" />
        </div>
        <div className="h-5 w-3/4 rounded-lg bg-stone-200 dark:bg-stone-700" />
        <div className="h-4 w-full rounded-lg bg-stone-200 dark:bg-stone-700" />
        <div className="h-4 w-2/3 rounded-lg bg-stone-200 dark:bg-stone-700" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-4 w-20 rounded bg-stone-200 dark:bg-stone-700" />
          <div className="h-9 w-28 rounded-xl bg-stone-200 dark:bg-stone-700" />
        </div>
      </div>
    </div>
  );
}