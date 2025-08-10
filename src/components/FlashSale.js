"use client"
import React from 'react';

const FlashSale = () => {
    // Product data array for easier rendering
    const products = {
        flashSale: [
            {
                title: "Rose Report Earhuds - Wireless Earphones - Bluetooth in Ear...",
                price: "$1,500",
                originalPrice: "$2,000",
                discount: "25% OFF"
            },
            {
                title: "Simple Mobile 4G LTE Prepaid Smartphone",
                price: "$4,500"
            },
            {
                title: "4K UHD LED Smart TV with Chromoscar Built-in",
                price: "$1,500",
                originalPrice: "$2,000",
                discount: "25% OFF"
            }
        ],
        bestSellers: [
            {
                title: "Samsung Electronics Samsung Galaxy SET 5G",
                price: "$1,500",
                rating: "★★★★★ (128)"
            },
            {
                title: "Simple Mobile 5G LTE Galaxy 12 Mini Si3GB Gamble Phone",
                price: "$4,500",
                rating: "★★★★☆ (89)"
            },
            {
                title: "Sony DEGHXR High Zoom Point & Shoot Camera",
                price: "$1,500",
                rating: "★★★★★ (256)"
            }
        ],
        topRated: [
            {
                title: "Portable Wahing Machine, Tilia capacity Model 16NMF...",
                price: "$1,500",
                rating: "★★★★★ (312)"
            },
            {
                title: "Sony DEGHXR High Zoom Point & Shoot Camera",
                price: "$4,500",
                rating: "★★★★★ (201)"
            },
            {
                title: "Dell Cellules 700C-7480 All-in One Computer Monitor",
                price: "$1,500",
                rating: "★★★★☆ (156)"
            }
        ],
        newArrivals: [
            {
                title: "TOZO 76 True Wireless Earhuds Bluetooth Headphone...",
                price: "$1,500",
                isNew: true
            },
            {
                title: "JBL FLIP + Videoproof Portable Bluetooth Speaker...",
                price: "$4,500",
                isNew: true
            },
            {
                title: "Wyze Cam Pan xz 10000 Ppu/TH/Zoom Wi-Fi Indoor Smart...",
                price: "$1,500",
                isNew: true
            }
        ]
    };

    // Countdown timer state (example implementation)
    const [timeLeft, setTimeLeft] = React.useState({
        hours: 12,
        minutes: 34,
        seconds: 56
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Flash Sale Banner */}
            <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold mr-4">FLASH SALE TODAY</h2>
                    <div className="flex items-center space-x-2 bg-black bg-opacity-20 px-3 py-1 rounded">
                        <span className="font-bold">ENDS IN:</span>
                        <span className="bg-white text-red-600 px-2 py-1 rounded font-mono font-bold">
                            {String(timeLeft.hours).padStart(2, '0')}:
                            {String(timeLeft.minutes).padStart(2, '0')}:
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                    </div>
                </div>
                <button className="bg-white text-red-600 hover:bg-gray-100 px-6 py-2 rounded-full font-bold transition-colors">
                    VIEW ALL →
                </button>
            </div>

            {/* Flash Sale Products */}
            <div className="bg-red-50 p-6 rounded-b-lg mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.flashSale.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">Product Image</span>
                            </div>
                            <div className="p-4">
                                {product.discount && (
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                                        {product.discount}
                                    </span>
                                )}
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
                                <div className="flex items-center">
                                    <span className="text-xl font-bold text-red-600">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-gray-500 line-through ml-2 text-sm">{product.originalPrice}</span>
                                    )}
                                </div>
                                <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium transition-colors">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Categories Sections */}
            <div className="space-y-12">
                {/* Best Sellers */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">BEST SELLERS</h3>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                            See All →
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.bestSellers.map((product, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-500">Product Image</span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium mb-2 line-clamp-2">{product.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-800">{product.price}</span>
                                        <span className="text-yellow-400 text-sm">{product.rating}</span>
                                    </div>
                                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Rated */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">TOP RATED</h3>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                            See All →
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.topRated.map((product, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-500">Product Image</span>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-medium mb-2 line-clamp-2 flex-1">{product.title}</h3>
                                        {index === 0 && (
                                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded ml-2">
                                                #1
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-800">{product.price}</span>
                                        <span className="text-yellow-400 text-sm">{product.rating}</span>
                                    </div>
                                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Arrivals */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">NEW ARRIVAL</h3>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                            See All →
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.newArrivals.map((product, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                                    {product.isNew && (
                                        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            NEW
                                        </span>
                                    )}
                                    <span className="text-gray-500">Product Image</span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium mb-2 line-clamp-2">{product.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-800">{product.price}</span>
                                        <span className="text-gray-400 text-sm">Just added</span>
                                    </div>
                                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSale;