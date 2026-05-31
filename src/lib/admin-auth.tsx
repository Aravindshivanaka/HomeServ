"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const ADMIN_PASSCODE = "servehome2025";

type AdminAuthState = {
  isAdmin: boolean;
  login: (passcode: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthState>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("servehome_admin");
    if (stored === "1") setIsAdmin(true);
  }, []);

  function login(passcode: string): boolean {
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem("servehome_admin", "1");
      setIsAdmin(true);
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem("servehome_admin");
    setIsAdmin(false);
  }

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
