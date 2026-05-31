import { MobileShell } from "@/components/layout/mobile-shell";

export default function WorkerProfileLoading() {
  return (
    <MobileShell>
      <div className="flex flex-col px-4 pt-3 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-4 flex h-10 items-center justify-between">
          <div className="size-8 rounded-full bg-gray-200" />
          <div className="h-6 w-32 rounded bg-gray-200" />
          <div className="size-8 rounded-full bg-gray-200" />
        </div>

        {/* main sections */}
        <div className="flex flex-col gap-5 py-2">
          {/* Hero Card Skeleton */}
          <div className="rounded-2xl border border-gray-150 bg-white p-3.5 flex gap-3">
            <div className="size-20 rounded-xl bg-gray-200" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-5.5 w-40 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
          </div>

          {/* Contact Card Skeleton */}
          <div className="rounded-2xl border border-gray-150 bg-white p-4 flex flex-col gap-3">
            <div className="h-5 w-28 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
          </div>

          {/* About Card Skeleton */}
          <div className="rounded-2xl border border-gray-150 bg-white p-4 flex flex-col gap-2">
            <div className="h-5 w-24 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
