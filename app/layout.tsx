import "@/styles/globals.css"
import React, {PropsWithChildren} from "react"
import {Metadata} from "next"

import {siteConfig} from "@/config/site"
import {fontSans} from "@/lib/fonts"
import {cn} from "@/lib/utils"
import ProgressBarProvider from "@/components/progress-bar"
import {TailwindIndicator} from "@/components/tailwind-indicator"
import {ThemeProvider} from "@/components/theme-provider"
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <head/>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ProgressBarProvider>
          {children}
          <Toaster />
        </ProgressBarProvider>
        <TailwindIndicator/>
      </ThemeProvider>
      </body>
      </html>
    </>
  )
}
