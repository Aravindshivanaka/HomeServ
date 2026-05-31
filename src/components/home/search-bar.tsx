"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

import { layout } from "@/lib/layout";
import { getCategoryIcon } from "@/lib/category-icons";
import { performLocalSearch, type SearchResults } from "@/lib/search";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResults>({ categories: [], workers: [] });
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or touch outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const searchResults = performLocalSearch(value);
    setResults(searchResults);
    setIsOpen(value.trim() !== "");
  };

  const handleFocus = () => {
    if (query.trim() !== "") {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex items-center gap-2 w-full">
      <div className="relative flex-1">
        <label className={`relative flex ${layout.touchBtn} w-full items-center`}>
          <span className="sr-only">Search workers or services</span>
          <Search
            className="pointer-events-none absolute left-3.5 size-[18px] text-[#6B7280]"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder="Search workers or services..."
            className={`h-12 w-full ${layout.roundedInput} border-0 bg-[#F1F5F9] py-3 pr-3 pl-10 text-sm leading-5 text-[#111827] placeholder:text-[#6B7280] outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/25`}
          />
        </label>

        {/* Search Results Dropdown Overlay */}
        {isOpen && query.trim() !== "" && (
          <div
            className={`absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[360px] overflow-y-auto ${layout.roundedCard} border border-[#E5E7EB] bg-white p-2 ${layout.cardShadowMd}`}
          >
            {/* Matching Categories */}
            {results.categories.length > 0 && (
              <div className="mb-3">
                <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                  Categories
                </div>
                <div className="mt-1 flex flex-col gap-0.5">
                  {results.categories.slice(0, 3).map((category) => {
                    const Icon = getCategoryIcon(category.icon);
                    return (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-[#F8FAFC] active:bg-[#F3F4F6] transition-colors"
                      >
                        <div
                          className="flex size-9 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: category.iconBg }}
                        >
                          <Icon
                            className="size-4.5"
                            style={{ color: category.iconColor }}
                            aria-hidden
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-[#111827] truncate">
                            {category.name}
                          </div>
                          <div className="text-xs text-[#6B7280] truncate">
                            {category.workerCount} workers available
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Matching Workers */}
            {results.workers.length > 0 && (
              <div>
                <div className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                  Workers
                </div>
                <div className="mt-1 flex flex-col gap-0.5">
                  {results.workers.slice(0, 5).map((worker) => (
                    <Link
                      key={worker.id}
                      href={`/worker/${worker.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-xl p-2 hover:bg-[#F8FAFC] active:bg-[#F3F4F6] transition-colors"
                    >
                      <div className="relative size-10 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={worker.imageUrl}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="size-10 rounded-full object-cover"
                        />
                        {worker.isVerified && (
                          <span
                            className="absolute -right-0.5 -bottom-0.5 flex size-4 items-center justify-center rounded-full bg-[#22C55E] text-white"
                            aria-label="Verified worker"
                          >
                            <BadgeCheck className="size-2.5 text-white" strokeWidth={3} aria-hidden />
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-[#111827] truncate">
                            {worker.name}
                          </span>
                          <span className="shrink-0 rounded bg-[#F3F4F6] px-1.5 py-0.5 text-[9px] font-bold text-[#6B7280] tracking-wide uppercase">
                            {worker.categoryLabel}
                          </span>
                        </div>
                        <div className="text-xs text-[#6B7280] truncate mt-0.5">
                          {worker.area}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {results.categories.length === 0 && results.workers.length === 0 && (
              <div className="py-6 px-3 text-center text-sm font-medium text-[#6B7280]">
                No workers or services found
              </div>
            )}
          </div>
        )}
      </div>
      <button
        type="button"
        className={`flex size-12 shrink-0 items-center justify-center ${layout.roundedInput} bg-[#F1F5F9] text-[#6B7280]`}
        aria-label="Filter search"
      >
        <SlidersHorizontal className="size-5" aria-hidden />
      </button>
    </div>
  );
}

