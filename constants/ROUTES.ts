const ROUTES = {
  HOME: "/",
  SEARCH: "/search",

  SEARCH_WITH_URL: (url: string) => `/search?url=${url}`,
};

export default ROUTES;
