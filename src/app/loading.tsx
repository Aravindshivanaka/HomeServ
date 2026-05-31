import { MobileShell } from "@/components/layout/mobile-shell";

export default function HomeLoading() {
  return (
    <MobileShell>
      <main className="flex flex-col gap-6 px-4 pt-3 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col gap-1.5">
            <div className="h-4.5 w-32 rounded bg-gray-200" />
            <div className="h-6 w-48 rounded bg-gray-200" />
          </div>
          <div className="size-11 rounded-full bg-gray-200" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="flex gap-2">
          <div className="h-12 flex-1 rounded-xl bg-gray-200" />
          <div className="size-12 rounded-xl bg-gray-200" />
        </div>

        {/* Promo Banner Skeleton */}
        <div className="h-32 w-full rounded-2xl bg-gray-200" />

        {/* Categories Section Skeleton */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="h-6 w-28 rounded bg-gray-200" />
            <div className="h-5 w-16 rounded bg-gray-200" />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Popular Workers Skeleton */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="h-6 w-36 rounded bg-gray-200" />
            <div className="h-5 w-16 rounded bg-gray-200" />
          </div>
          <div className="flex gap-4 overflow-x-hidden">
            <div className="h-44 w-72 shrink-0 rounded-2xl bg-gray-200" />
            <div className="h-44 w-72 shrink-0 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </main>
    </MobileShell>
  );
}
