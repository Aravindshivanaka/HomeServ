import { BackButton } from "@/components/navigation/back-button";

type ProfilePageHeaderProps = {
  categorySlug: string;
};

export function ProfilePageHeader({ categorySlug }: ProfilePageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-[#E5E7EB] bg-white px-4 py-2.5">
      <BackButton
        className="inline-flex min-h-12 items-center gap-1 text-sm font-medium text-[#111827] active:opacity-70"
        label="Back"
        fallback={`/category/${categorySlug}`}
      />
    </header>
  );
}
