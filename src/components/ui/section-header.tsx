import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  viewAllHref?: string;
  id?: string;
};

export function SectionHeader({ title, viewAllHref, id }: SectionHeaderProps) {
  return (
    <div className="mb-2.5 flex items-center justify-between">
      <h2
        id={id}
        className="text-[18px] font-semibold leading-6 text-[#111827]"
      >
        {title}
      </h2>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="min-h-12 py-2 text-sm font-medium leading-none text-[#6B7280]"
        >
          View all
        </Link>
      ) : null}
    </div>
  );
}
