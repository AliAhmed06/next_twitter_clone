/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: [
    	'randomuser.me','lh3.googleusercontent.com', "firebasestorage.googleapis.com"
    ]
  }
}

module.exports = nextConfig
