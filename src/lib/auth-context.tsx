"use client";

import { createContext, useContext, useState, useCallback } from "react";

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
  // Session-only mock state (no persistence)
  const [user, setUser] = useState<User | null>(null);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [onLoginSuccessCallback, setOnLoginSuccessCallback] = useState<(() => void) | null>(null);

  const login = useCallback((mobile: string) => {
    setUser({
      mobile,
      name: "Trusted User", // Mock name for frontend MVP
    });
  }, []);

  const logout = useCallback(() => {
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
