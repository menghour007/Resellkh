/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["gateway.pinata.cloud"],
    // Add this line if it's not there, or add 'images.unsplash.com' to the array
  },
};

export default nextConfig;
