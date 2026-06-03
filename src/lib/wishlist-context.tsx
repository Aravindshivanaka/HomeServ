"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

type WishlistContextType = {
  wishlist: string[];
  toggleWishlist: (workerId: string) => void;
  isFavorited: (workerId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadWishlist = () => {
      const saved = localStorage.getItem("servehome-wishlist");
      if (saved) {
        try {
          setWishlist(JSON.parse(saved));
        } catch (e) {}
      } else {
        setWishlist([]);
      }
      setIsInitialized(true);
    };

    loadWishlist();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("servehome-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized]);

  const toggleWishlist = (workerId: string) => {
    setWishlist((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId]
    );
  };

  const isFavorited = (workerId: string) => wishlist.includes(workerId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isFavorited }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
