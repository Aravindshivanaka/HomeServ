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
    const loadWishlist = async () => {
      if (user) {
        const userPhone = user.mobile.includes("@") ? user.mobile : "+91" + user.mobile;
        const { data, error } = await supabase
          .from("wishlist")
          .select("worker_id")
          .eq("user_phone", userPhone);
        if (!error && data) {
          setWishlist(data.map((item: any) => item.worker_id));
        }
      } else {
        const saved = localStorage.getItem("servehome-wishlist");
        if (saved) {
          try {
            setWishlist(JSON.parse(saved));
          } catch (e) {}
        } else {
          setWishlist([]);
        }
      }
      setIsInitialized(true);
    };

    loadWishlist();
  }, [user]);

  useEffect(() => {
    if (isInitialized && !user) {
      localStorage.setItem("servehome-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized, user]);

  const toggleWishlist = async (workerId: string) => {
    const isFav = wishlist.includes(workerId);
    
    setWishlist((prev) =>
      isFav ? prev.filter((id) => id !== workerId) : [...prev, workerId]
    );

    if (user) {
      const userPhone = user.mobile.includes("@") ? user.mobile : "+91" + user.mobile;
      if (isFav) {
        await supabase
          .from("wishlist")
          .delete()
          .eq("worker_id", workerId)
          .eq("user_phone", userPhone);
      } else {
        await supabase
          .from("wishlist")
          .insert({ worker_id: workerId, user_phone: userPhone });
      }
    }
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
