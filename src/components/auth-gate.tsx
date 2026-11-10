"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { LoginScreen } from "@/components/login-screen";
import { useStore } from "@/lib/store";

/** Rotas públicas, que precisam abrir mesmo sem login. */
const PUBLIC_PATHS = ["/privacidade", "/termos"];

export function AuthGate({ children }: { children: ReactNode }) {
  const { user } = useStore();
  const pathname = usePathname();

  if (PUBLIC_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <AppShell>{children}</AppShell>;
}
