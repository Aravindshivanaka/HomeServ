import { IndianRupee } from "lucide-react";

import { ProfileSectionCard } from "@/components/profile/profile-section-card";

type PriceSectionProps = {
  feeInr: number;
  categoryName: string;
};

export function PriceSection({ feeInr, categoryName }: PriceSectionProps) {
  return (
    <ProfileSectionCard title="Unlock Fee">
      <div className="flex items-center justify-between gap-3 rounded-xl bg-[#F9FAFB] px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-[#FFEDD5]">
            <IndianRupee
              className="size-4 text-[#F97316]"
              strokeWidth={2.5}
              aria-hidden
            />
          </span>
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Amount to Pay</p>
            <p className="text-xs leading-4 text-[#6B7280]">
              One-time unlock for {categoryName}
            </p>
          </div>
        </div>
        <p className="text-xl font-semibold text-[#111827]">₹{feeInr}</p>
      </div>
      <p className="mt-2.5 text-sm leading-5 text-[#6B7280]">
        Pay once to unlock all remaining numbers in this category. Access stays
        active for 3 days, then locks again until you renew.
      </p>
    </ProfileSectionCard>
  );
}
