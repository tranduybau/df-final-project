interface ENVType {
  NODE_ENV: string
  BASE_URL?: string
  IMAGES_DOMAINS?: string
  GITHUB_API?: string
  GITHUB_CONTENT_API?: string
}

const ENV: ENVType = {
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  IMAGES_DOMAINS: process.env.NEXT_PUBLIC_IMAGES_DOMAINS,
  GITHUB_API: process.env.NEXT_PUBLIC_GITHUB_API,
  GITHUB_CONTENT_API: process.env.NEXT_PUBLIC_GITHUB_CONTENT_API,
};

export default ENV;
