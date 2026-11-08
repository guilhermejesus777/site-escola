import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { AuthGate } from "@/components/auth-gate";

const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("site-escola:tema");var d=t==="dark"||((!t||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";var e=localStorage.getItem("site-escola:tema-escola");if(e==="on"){document.documentElement.dataset.escola="on";}else{document.documentElement.removeAttribute("data-escola");}}catch(err){}})();`;

export const metadata: Metadata = {
  title: "Agenda Escolar — Reservas e Provas",
  description:
    "Protótipo do app de reservas de espaços e agenda de provas e atividades da escola.",
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
