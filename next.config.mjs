/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_URL_API: (() => process.env.NEXT_PUBLIC_URL_API)(),
    NEXT_PUBLIC_CLIENT_ID_PAYPAL: (() => process.env.NEXT_PUBLIC_CLIENT_ID_PAYPAL)()
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
