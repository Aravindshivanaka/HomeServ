import { Lock } from "lucide-react";

export function UnlockHero() {
  return (
    <div className="flex justify-center py-1">
      <span className="flex size-16 items-center justify-center rounded-full bg-[#EFF6FF] shadow-[0px_4px_16px_rgba(37,99,235,0.12)]">
        <Lock className="size-8 text-[#2563EB]" strokeWidth={2} aria-hidden />
      </span>
    </div>
  );
}
