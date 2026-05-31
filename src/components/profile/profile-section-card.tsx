import { layout } from "@/lib/layout";

type ProfileSectionCardProps = {
  title?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
};

export function ProfileSectionCard({
  title,
  children,
  headerRight,
}: ProfileSectionCardProps) {
  return (
    <section
      className={`${layout.roundedCard} border border-[#E5E7EB] bg-white p-3.5 ${layout.cardShadow}`}
    >
      {title ? (
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold leading-6 text-[#111827]">
            {title}
          </h2>
          {headerRight}
        </div>
      ) : null}
      {children}
    </section>
  );
}
