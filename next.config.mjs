/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    "@mui/x-date-pickers",
    "mui-tel-input",
    "mui-one-time-password-input",
  ],
};

export default nextConfig;
