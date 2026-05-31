import { BottomNav } from "@/components/navigation/bottom-nav";

type MobileShellProps = {
  children: React.ReactNode;
};

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-md bg-[#F8FAFC] pb-[calc(4rem+env(safe-area-inset-bottom))]">
      {children}
      <BottomNav />
    </div>
  );
}
