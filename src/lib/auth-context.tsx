"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { isLoggedIn as checkLoggedIn, getUserPhone, setLoggedIn, logout as authLogout } from "@/lib/auth";

export type User = {
  mobile: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (phone: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (checkLoggedIn()) {
      const phone = getUserPhone();
      setUser({ mobile: phone || "", name: "Trusted User" });
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      if (checkLoggedIn()) {
        setUser({ mobile: getUserPhone() || "", name: "Trusted User" });
      } else {
        setUser(null);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const login = useCallback((phone: string) => {
    setLoggedIn(phone);
    setUser({ mobile: phone, name: "Trusted User" });
  }, []);

  const logout = useCallback(() => {
    authLogout();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
