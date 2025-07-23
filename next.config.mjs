/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: ""
      },
    ],
  },
  // Añade estas configuraciones para Prisma:
  webpack: (config) => {
    // Excluir Prisma del bundle del cliente
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