/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    reactStrictMode: false,
    images: {
        domains: ["res.cloudinary.com", "imgur.com"],
    },
};

module.exports = nextConfig;
