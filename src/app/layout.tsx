import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uprising Video System — AI-Powered Video Automation",
  description:
    "Système d'automatisation vidéo complet : ingestion multi-plateforme, IA centrale, dashboard React, pipeline de production et boucle d'analyse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
        style={{ display: "flex", minHeight: "100vh" }}
      >
        <Sidebar />
        <main
          style={{
            flex: 1,
            marginLeft: "var(--sidebar-width)",
            minHeight: "100vh",
            transition: "margin-left var(--transition-base)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
