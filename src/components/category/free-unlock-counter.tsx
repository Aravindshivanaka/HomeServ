import { Lock } from "lucide-react";

type FreeUnlockCounterProps = {
  remaining: number;
};

export function FreeUnlockCounter({ remaining }: FreeUnlockCounterProps) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-3.5 py-3"
      role="status"
      aria-live="polite"
      aria-label={`${remaining} free numbers remaining`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-[0px_1px_4px_rgba(37,99,235,0.12)]">
          <Lock className="size-4" strokeWidth={2.25} aria-hidden />
        </span>
        <p className="text-sm font-semibold leading-5 text-[#1E40AF]">
          <span className="text-base font-semibold text-[#111827]">
            {remaining}
          </span>{" "}
          Free Numbers Remaining
        </p>
      </div>
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-[#2563EB] shadow-[0px_1px_4px_rgba(37,99,235,0.12)]"
        aria-hidden
      >
        {remaining}
      </span>
    </div>
  );
}
