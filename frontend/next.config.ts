import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // TODO: BACKEND INTEGRATION - Uncomment and configure these options when connecting to Rust backend
  
  // Option 1: API Proxy (recommended for development)
  // This will proxy /api requests to your Rust backend
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:8080/api/:path*', // TODO: Update with your Rust backend URL
  //     },
  //   ];
  // },

  // Option 2: Environment Variables for API Base URL
  // Create a .env.local file with:
  // NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
  
  // TODO: CORS - If your Rust backend runs on a different port/domain
  // You'll need to configure CORS properly in your Rust backend
  
  // TODO: PRODUCTION - For production deployment:
  // - Update API URLs to your production backend
  // - Configure proper CORS origins
  // - Enable HTTPS
  // - Add CSP headers for security
  
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "default-src 'self'; connect-src 'self' http://localhost:8080;", // TODO: Update for production
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
