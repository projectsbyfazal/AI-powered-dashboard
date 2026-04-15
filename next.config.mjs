/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 👈 allow all domains
      },
    ],
  },
};

export default nextConfig;