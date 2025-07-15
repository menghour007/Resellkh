/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: [
      'cloudflare-ipfs.com',
      'gateway.pinata.cloud', // if still using this
      'lh3.googleusercontent.com' // for Google avatars
    ],
  },
};

export default nextConfig;