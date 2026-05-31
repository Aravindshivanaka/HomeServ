import { ProfileSectionCard } from "@/components/profile/profile-section-card";

type AboutSectionProps = {
  about: string;
};

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <ProfileSectionCard title="About">
      <p className="text-sm leading-6 text-[#6B7280]">{about}</p>
    </ProfileSectionCard>
  );
}
