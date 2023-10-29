import React from 'react';
import { Metadata } from 'next';

import ProgressBarProvider from '@/components/progress-bar';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import { siteConfig } from '@/config/site';
import { AuthContextProvider } from '@/context/auth';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthContextProvider>
            <ProgressBarProvider>
              {children}
              <Toaster />
            </ProgressBarProvider>
          </AuthContextProvider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
