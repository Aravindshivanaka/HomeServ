import { MobileShell } from "@/components/layout/mobile-shell";

export default function CategoryLoading() {
  return (
    <MobileShell>
      <div className="flex flex-col px-4 pt-3 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex flex-col gap-1">
            <div className="h-6 w-36 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
          <div className="size-8 rounded-full bg-gray-200" />
        </div>

        {/* List Skeleton */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3.5 rounded-2xl border border-gray-150 bg-white p-3.5"
            >
              <div className="flex gap-2.5">
                <div className="size-14 rounded-full bg-gray-200" />
                <div className="flex flex-1 flex-col gap-1.5 pt-0.5">
                  <div className="h-5 w-32 rounded bg-gray-200" />
                  <div className="h-4 w-40 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="h-11 rounded-xl bg-gray-200" />
                <div className="h-11 rounded-xl bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
