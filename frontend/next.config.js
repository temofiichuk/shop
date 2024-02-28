/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
	images: {
		domains: ["www.google.com", "loremflickr.com"],
	},
};

module.exports = nextConfig;
