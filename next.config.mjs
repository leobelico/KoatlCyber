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
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@prisma/client': '@prisma/client',
        '.prisma/client': '.prisma/client',
        prisma: 'prisma'
      });
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@prisma/client", 
      "prisma"
    ],
  }
};

export default nextConfig;