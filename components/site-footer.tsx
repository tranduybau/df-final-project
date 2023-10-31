import React from 'react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import ROUTES from '@/constants/ROUTES';

// eslint-disable-next-line import/prefer-default-export
export function SiteFooter() {
  return (
    <footer className="container mx-auto w-full py-10 md:py-24">
      <div className="flex grid-cols-1 flex-col gap-3 md:grid md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter">
            {siteConfig.name}
          </h2>

          <div>
            {siteConfig.description}
          </div>
        </div>

        <div className="row-span-2 flex flex-col gap-2 md:items-end">
          <Link href={ROUTES.HOME}>
            <b>Home</b>
          </Link>

          <Link href={ROUTES.HOME}>
            FAQ
          </Link>

          <Link href={ROUTES.HOME}>
            Customer support
          </Link>

          <Link href={ROUTES.HOME}>
            How it works
          </Link>

          <Link href={ROUTES.HOME}>
            Contact us
          </Link>
        </div>

        <div className="flex items-end font-semibold">
          {siteConfig.name}
          {' '}
          ©
          {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
