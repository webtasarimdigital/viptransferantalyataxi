import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vkwzxezehrkhombjorvo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
