/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['fdn2.gsmarena.com', 'res.cloudinary.com', 'images.unsplash.com'],
    },

    
  rules: {
        "react/no-unescaped-entities": "off",
        "@next/next/no-img-element": "off",
        "react-hooks/exhaustive-deps": "off"
    },
};


export default nextConfig;
