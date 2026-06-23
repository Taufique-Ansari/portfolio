import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The GSAP engine imperatively rewrites the DOM, which doesn't play well with React's
  // dev-only double-invoke; disabling Strict Mode avoids spurious reconciliation churn.
  reactStrictMode: false,
  allowedDevOrigins: ['192.168.11.110', 'xerox-upload-numbing.ngrok-free.dev']
};

export default nextConfig;
