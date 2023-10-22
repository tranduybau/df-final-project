import React, { PropsWithChildren } from 'react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>

      <SiteFooter />
    </div>
  );
}
