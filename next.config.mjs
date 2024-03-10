/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "mars.jpl.nasa.gov",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mars.nasa.gov",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "mars.nasa.gov",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
