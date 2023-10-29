'use client';

import {
  PropsWithChildren, useCallback, useEffect, useState,
} from 'react';
import * as React from 'react';
import { createContext, isSSR } from '@dwarvesf/react-utils';

import { emitter } from '@/lib/emitter';
import * as authApi from '@/services/auth/auth';

interface AuthContextValues {
  isLogin: boolean
  login: (email: string, password: string) => Promise<any>
  logout: () => void
  user?: string
}

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
});

const tokenKey = 'df-token';
const userKey = 'df-user';
const getToken = () => window.localStorage.getItem(tokenKey);
const cleanAuth = () => {
  window.localStorage.removeItem(tokenKey);
  window.localStorage.removeItem(userKey);
};

function AuthContextProvider({ children }: PropsWithChildren) {
  const [isLogin, setIsLogin] = useState(() => {
    if (isSSR()) return false;
    return !!window.localStorage.getItem(tokenKey);
  });
  const [user, setUser] = useState(() => (isSSR() ? '' : window.localStorage.getItem(userKey) || ''));

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await authApi.login({ username, password });
      if (res.data) {
        setIsLogin(true);
        setUser(res.data.username);
        window.localStorage.setItem(tokenKey, res.data.accessToken);
        window.localStorage.setItem(userKey, res.data.username);
      }
    } catch (error) {
      throw new Error('Incorrect username or password');
    }
  }, []);

  const logout = useCallback(() => {
    setIsLogin(false);
    cleanAuth();
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (isLogin) {
        // Retrieve user info from local storage first
        const userRaw = window.localStorage.getItem(userKey);
        if (userRaw) {
          try {
            setUser(JSON.parse(userRaw));
          } catch {
            // Failed to parse user info -> try to fetch new data
          }
        }
      }
    };
    bootstrapAsync();

    emitter.on('FORCE_LOGOUT', logout);
    return () => {
      emitter.off('FORCE_LOGOUT', logout);
    };
  }, [isLogin, logout]);

  return (
    <Provider value={{
      isLogin, login, logout, user,
    }}
    >
      {children}
    </Provider>
  );
}

export { AuthContextProvider, getToken, useAuthContext };
