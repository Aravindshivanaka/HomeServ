import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { AuthProvider } from "@/lib/auth-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { LoginModal } from "@/components/auth/login-modal";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ServeHome — Trusted Local Workers",
  description:
    "Find trusted local workers near you. Browse categories and call workers directly.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F8FAFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full bg-[#F8FAFC] font-sans antialiased">
        <AuthProvider>
          <WishlistProvider>
            {children}
            <LoginModal />
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
