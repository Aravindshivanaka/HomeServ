import { MobileShell } from "@/components/layout/mobile-shell";
import { WishlistContent } from "@/components/wishlist/wishlist-content";
import { layout } from "@/lib/layout";

export default function WishlistPage() {
  return (
    <MobileShell>
      <div className={`flex flex-col ${layout.pageX}`}>
        {/* Page header */}
        <header className="sticky top-0 z-40 -mx-4 border-b border-[#E5E7EB] bg-white px-4 py-2.5">
          <h1 className="text-lg font-semibold leading-6 text-[#111827]">
            Wishlist
          </h1>
          <p className="mt-0.5 text-xs leading-4 text-[#6B7280]">
            Your saved trusted workers
          </p>
        </header>

        <main className={`flex flex-col py-3 pb-4`}>
          <WishlistContent />
        </main>
      </div>
    </MobileShell>
  );
}
