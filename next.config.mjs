/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "scontent-sin6-4.cdninstagram.com" },
    ],
    remotePatterns: [{ protocol: "https", hostname: "randomuser.me" }],
  },
};

export default nextConfig;
