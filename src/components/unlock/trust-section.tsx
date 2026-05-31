import { BadgeCheck, ShieldCheck, Zap } from "lucide-react";

import { ProfileSectionCard } from "@/components/profile/profile-section-card";

const trustIcons = [BadgeCheck, ShieldCheck, Zap] as const;

type TrustSectionProps = {
  points: string[];
};

export function TrustSection({ points }: TrustSectionProps) {
  return (
    <ProfileSectionCard title="Why it's safe">
      <ul className="flex flex-col gap-3">
        {points.map((point, index) => {
          const Icon = trustIcons[index % trustIcons.length];
          return (
            <li key={point} className="flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF]">
                <Icon
                  className="size-4 text-[#2563EB]"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </span>
              <span className="text-sm leading-5 text-[#374151]">{point}</span>
            </li>
          );
        })}
      </ul>
    </ProfileSectionCard>
  );
}
