"use client";

import { useState, useEffect } from "react";

export function GreetingHeader() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    setUserName(name || "");
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "👋";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-xs font-semibold text-[#2563EB]"
          aria-hidden
        >
          {getInitials(userName)}
        </div>
        <div className="min-w-0">
          <p className="text-xs leading-4 text-[#6B7280]">Hello 👋</p>
          {userName ? (
            <h1 className="truncate text-[20px] font-bold leading-7 text-[#111827]">
              {userName}
            </h1>
          ) : (
            <h1 className="truncate text-[20px] font-semibold leading-7 text-[#111827]">
              Find workers near you
            </h1>
          )}
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: '#F3E8FF',
        border: '1px solid #D8B4FE',
        borderRadius: '20px',
        padding: '6px 12px',
        cursor: 'default'
      }}>
        <span style={{ fontSize: '13px' }}>📍</span>
        <span style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#7C3AED'
        }}>
          Jagtial
        </span>
      </div>
    </header>
  );
}
