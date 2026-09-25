"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserSession } from "@/types";

interface AuthContextType {
  user: UserSession | null;
  role: "customer" | "seller" | "admin" | "guest";
  isAuthenticated: boolean;
  login: (email: string, role?: "customer" | "seller" | "admin") => void;
  logout: () => void;
  switchRole: (role: "customer" | "seller" | "admin") => void;
}

const DEFAULT_USERS: Record<"customer" | "seller" | "admin", UserSession> = {
  customer: {
    id: "cust-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
  },
  seller: {
    id: "seller-1",
    name: "Vikram Malhotra",
    email: "vikram@apexretail.in",
    role: "seller",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
  },
  admin: {
    id: "admin-1",
    name: "ORANZA Admin",
    email: "operations@oranza.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(DEFAULT_USERS.customer);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("oranza_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(DEFAULT_USERS.customer);
      }
    } catch {
      setUser(DEFAULT_USERS.customer);
    }
  }, []);

  const login = (email: string, role: "customer" | "seller" | "admin" = "customer") => {
    const newUser: UserSession = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0].replace(".", " "),
      email,
      role,
      avatar: DEFAULT_USERS[role].avatar,
    };
    setUser(newUser);
    try {
      localStorage.setItem("oranza_user", JSON.stringify(newUser));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("oranza_user");
    } catch {
      // ignore
    }
  };

  const switchRole = (newRole: "customer" | "seller" | "admin") => {
    const selected = DEFAULT_USERS[newRole];
    setUser(selected);
    try {
      localStorage.setItem("oranza_user", JSON.stringify(selected));
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : "guest",
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
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
