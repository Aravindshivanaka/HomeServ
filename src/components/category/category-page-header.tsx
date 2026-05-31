import { BackButton } from "@/components/navigation/back-button";

type CategoryPageHeaderProps = {
  title: string;
  workerCount: number;
};

export function CategoryPageHeader({
  title,
  workerCount,
}: CategoryPageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-[#E5E7EB] bg-white px-4 py-2.5">
      <div className="flex items-center gap-2">
        <BackButton fallback="/" />
        <h1 className="min-w-0 flex-1 text-lg font-semibold leading-6 text-[#111827]">
          {title}{" "}
          <span className="font-semibold text-[#6B7280]">({workerCount})</span>
        </h1>
      </div>
    </header>
  );
}
