import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'notehub-api.goit.study',
        pathname: '//**', 
      },
    ],
  },
};

export default nextConfig;
