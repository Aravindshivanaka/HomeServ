import { ProfileSectionCard } from "@/components/profile/profile-section-card";

type ServicesSectionProps = {
  services: string[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <ProfileSectionCard title="Services">
      <ul className="flex flex-col gap-2">
        {services.map((service) => (
          <li
            key={service}
            className="flex items-center gap-2 text-sm leading-5 text-[#111827]"
          >
            <span
              className="size-1.5 shrink-0 rounded-full bg-[#2563EB]"
              aria-hidden
            />
            {service}
          </li>
        ))}
      </ul>
    </ProfileSectionCard>
  );
}
