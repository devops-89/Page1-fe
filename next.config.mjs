/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    "@mui/x-date-pickers",
    "mui-tel-input",
    "mui-one-time-password-input",
  ],
  images:{
    remotePatterns:[
        {
            protocol: "https",
            hostname: "cdn.tektravels.com",
        },
        {
            protocol: "https",
            hostname: "dev.page1travels.com",
        }
    ]
  }
};

export default nextConfig;