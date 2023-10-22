const ROUTES = {
  HOME: '/',
  REVIEWING: (path: string) => `/reviewing/${path}`,

  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',

  CONTACT: '/contact',
};

export default ROUTES;
