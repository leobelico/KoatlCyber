/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  webpack: (config) => {
    // Solución para Prisma
    config.externals = [...(config.externals || []), {
      '@prisma/client': '@prisma/client',
      '.prisma/client': '.prisma/client'
    }];
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  }
};

export default nextConfig;