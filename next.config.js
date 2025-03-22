/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost",
            port: "3000", // Change if your server runs on a different port
            pathname: "/uploads/images/**",
          },
        ],
      },
};

module.exports = nextConfig;
