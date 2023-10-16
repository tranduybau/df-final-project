import React from "react";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import ThemeProvider from "@/providers/Theme";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review Code With AI",
  description: "Review code with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "flex items-center flex-col min-h-[100dvh]")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />

          <div className="flex-1 w-full container">{children}</div>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
