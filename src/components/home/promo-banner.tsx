import Image from "next/image";
import { Phone } from "lucide-react";

import { bannerSlides } from "@/data/home";
import { layout } from "@/lib/layout";

/** Static first slide — no client JS for faster loads on weak networks */
export function PromoBanner() {
  const slide = bannerSlides[0];

  return (
    <section aria-label="Promotional banner">
      <div
        className={`overflow-hidden ${layout.roundedCard} bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] px-3.5 py-3 ${layout.cardShadow}`}
      >
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold tracking-[0.06em] text-[#F97316] uppercase">
              {slide.tagline}
            </p>
            <h2 className="mt-0.5 text-base font-semibold leading-snug text-[#111827]">
              {slide.title}
            </h2>
            <button
              type="button"
              className={`mt-2 inline-flex ${layout.touchBtn} items-center gap-1.5 rounded-xl bg-[#F97316] px-3.5 text-[15px] font-semibold text-white`}
            >
              <Phone className="size-4" aria-hidden />
              {slide.ctaLabel}
            </button>
          </div>
          <div className="relative size-[88px] shrink-0">
            <Image
              src="/banner-worker.svg"
              alt=""
              width={88}
              height={88}
              className="object-contain"
              priority
              sizes="88px"
            />
          </div>
        </div>
        <div
          className="mt-2 flex justify-center gap-1.5"
          aria-hidden
        >
          {bannerSlides.map((item, index) => (
            <span
              key={item.id}
              className={`size-1.5 rounded-full ${
                index === 0 ? "bg-[#2563EB]" : "bg-[#BFDBFE]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
