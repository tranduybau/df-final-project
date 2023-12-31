'use client';

import React from 'react';

import { useAuthContext } from '@/context/auth';

import { LoginForm, LoginFormType } from './_components/login-form';

export default function LoginPage() {
  const { login } = useAuthContext();
  const handleLoginFormSubmit = async (data: LoginFormType) => {
    const { username, password } = data;

    await login(username, password);
  };

  return (
    <>
      <head>
        <title>Sign In</title>
      </head>
      <div className="w-100% flex h-[100dvh] items-center justify-center">
        <LoginForm onSubmit={handleLoginFormSubmit} />
      </div>
    </>
  );
}
