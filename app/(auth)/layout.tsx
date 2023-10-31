'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ROUTES from '@/constants/ROUTES';
import { useAuthContext } from '@/context/auth';

export default function AuthLayout({ children }: React.PropsWithChildren) {
  const { push } = useRouter();
  const { isLogin } = useAuthContext();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (isLogin) {
      const search = searchParams.get('redirect');
      push(search || ROUTES.HOME);
    }
  }, [isLogin, push, searchParams]);

  return <div>{children}</div>;
}
