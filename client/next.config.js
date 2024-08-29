/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXT_SERVER_URL: process.env.NEXT_SERVER_URL,
	},
	images: {
		domains: ["t4.ftcdn.net"],
	},
	async redirects() {
		return [
			{ source: "/", destination: "/shop", permanent: true },
		];
	},
};

module.exports = nextConfig;
