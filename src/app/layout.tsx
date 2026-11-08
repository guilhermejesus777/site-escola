import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { AuthGate } from "@/components/auth-gate";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("site-escola:tema");var e=localStorage.getItem("site-escola:tema-escola");var d;if(e==="on"){d=true;document.documentElement.dataset.escola="on";}else{d=t==="dark"||((!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);}document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(err){}})();`;

export const metadata: Metadata = {
  title: "Agenda Escolar — Reservas e Provas",
  description:
    "Protótipo do app de reservas de espaços e agenda de provas e atividades da escola.",
  manifest: "/manifest.json",
  icons: {
    icon: "/mascote-cepk.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#5cc513",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
        <StoreProvider>
          <AuthGate>{children}</AuthGate>
        </StoreProvider>
      </body>
    </html>
  );
}
