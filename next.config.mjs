/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "mars.jpl.nasa.gov",
        port: "",
        pathname: "/msl-raw-images/**",
      },
    ],
  },
};

export default nextConfig;
