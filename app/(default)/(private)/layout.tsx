'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import qs from 'query-string';

import ROUTES from '@/constants/ROUTES';
import { useAuthContext } from '@/context/auth';

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  const { push } = useRouter();
  const pathname = usePathname();
  const { isLogin } = useAuthContext();

  React.useEffect(() => {
    if (!isLogin) {
      const path = `${ROUTES.SIGN_IN}?${qs.stringify({
        redirect: pathname,
      })}`;

      push(path);
    }
  }, [isLogin, pathname, push]);

  return children;
}
