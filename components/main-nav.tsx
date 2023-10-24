import * as React from 'react';
import Link from 'next/link';

import { Icons } from '@/components/icons';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types/nav';

interface MainNavProps {
  items?: NavItem[]
}

// eslint-disable-next-line import/prefer-default-export
export function MainNav({ items = [] }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item) => item.href && (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center text-sm font-medium text-muted-foreground',
                item.disabled && 'cursor-not-allowed opacity-80',
              )}
            >
              {item.title}
            </Link>
            ),
          )}
        </nav>
      ) : null}
    </div>
  );
}
