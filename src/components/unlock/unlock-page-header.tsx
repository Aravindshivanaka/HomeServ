import { BackButton } from "@/components/navigation/back-button";

type UnlockPageHeaderProps = {
  categorySlug: string;
  title?: string;
};

export function UnlockPageHeader({
  categorySlug,
  title = "Unlock Access",
}: UnlockPageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-[#E5E7EB] bg-white px-4 py-2.5">
      <div className="relative flex min-h-10 items-center justify-center">
        <BackButton
          className="absolute left-0 flex size-10 items-center justify-center rounded-full text-[#111827] active:bg-[#F3F4F6]"
          fallback={`/category/${categorySlug}`}
        />
        <h1 className="text-lg font-semibold leading-6 text-[#111827]">
          {title}
        </h1>
      </div>
    </header>
  );
}
