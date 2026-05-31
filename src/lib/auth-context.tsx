"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export type User = {
  mobile: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (mobile: string) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: (onSuccess?: () => void) => void;
  closeLoginModal: () => void;
  onLoginSuccessCallback: (() => void) | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [onLoginSuccessCallback, setOnLoginSuccessCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          mobile: session.user.phone ? session.user.phone.replace("+91", "") : (session.user.email || ""),
          name: "Trusted User",
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          mobile: session.user.phone ? session.user.phone.replace("+91", "") : (session.user.email || ""),
          name: "Trusted User",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback((mobile: string) => {
    setUser({
      mobile,
      name: "Trusted User",
    });
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const openLoginModal = useCallback((onSuccess?: () => void) => {
    if (onSuccess) {
      setOnLoginSuccessCallback(() => onSuccess);
    } else {
      setOnLoginSuccessCallback(null);
    }
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setOnLoginSuccessCallback(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        onLoginSuccessCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
