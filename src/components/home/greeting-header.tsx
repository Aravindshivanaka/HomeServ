import { MapPin } from "lucide-react";

import { homeUser } from "@/data/home";
import { layout } from "@/lib/layout";

export function GreetingHeader() {
  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-xs font-semibold text-[#2563EB]"
          aria-hidden
        >
          {homeUser.avatarInitials}
        </div>
        <div className="min-w-0">
          <p className="text-xs leading-4 text-[#6B7280]">{homeUser.greeting}</p>
          <h1 className="truncate text-[20px] font-semibold leading-7 text-[#111827]">
            {homeUser.name}
          </h1>
        </div>
      </div>
      <button
        type="button"
        className={`flex ${layout.touchMin} shrink-0 items-center gap-1 rounded-full border border-[#E5E7EB] bg-white px-3 text-sm font-medium text-[#111827] ${layout.cardShadow}`}
        aria-label={`Location: ${homeUser.location}`}
      >
        <MapPin className="size-4 shrink-0 text-[#2563EB]" aria-hidden />
        <span className="truncate">{homeUser.location}</span>
      </button>
    </header>
  );
}
