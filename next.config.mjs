/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  output: "export",

  images: {
    unoptimized: true,
  },
  // ...other config settings
};

export default nextConfig;
