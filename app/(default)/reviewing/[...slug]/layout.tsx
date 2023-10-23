'use client';

import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

import ROUTES from '@/constants/ROUTES';
import { useAuthContext } from '@/context/auth';

export default function ReviewLayout({ children }: PropsWithChildren) {
  const { push } = useRouter();
  const { isLogin } = useAuthContext();

  React.useEffect(() => {
    if (!isLogin) {
      push(ROUTES.SIGN_IN);
    }
  }, [isLogin, push]);

  return <div>{children}</div>;
}
