"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { LoginScreen } from "@/components/login-screen";
import { useStore } from "@/lib/store";

export function AuthGate({ children }: { children: ReactNode }) {
  const { user } = useStore();

  if (!user) {
    return <LoginScreen />;
  }

  return <AppShell>{children}</AppShell>;
}
