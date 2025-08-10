import React from 'react';

const MacbookProPage = () => {
    // News data array
    const newsItems = [
        {
            author: "Kristin",
            date: "16 Dec. 2019",
            comments: 453,
            title: "Crew mid-dollar consumption of maize all means",
            content: "Vulcanized consumption means dollar. Mannerless sound images, error maps keeping replicates, liquid diam materials texture, timelown restaurants and random pressure movies."
        },
        {
            author: "Robert",
            date: "28 Mar. 2019",
            comments: 729,
            title: "Chandler parlance different tactics, non blandit or art music is done.",
            content: "Manner accelerating adds an extreme voluptate. Premiere space with audio, voluptate or forter views. Immigrant takeover teams."
        },
        {
            author: "Arthur",
            date: "31 Mar. 2014",
            comments: 809,
            title: "Chandler masse and counter-taker of blazards, de, octobre et colline.",
            content: "Relaminating was balanced from wet granada adhesives. Mixing points, calls to excellent results, share unique concentration marks."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Product Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Macbook Pro</h1>
                <p className="text-xl text-gray-600 mb-6">
                    Apple M1 Max Chip, 32GB Unified Memory, 1TB SSD Storage
                </p>
                <div className="flex items-center mb-8">
                    <span className="text-lg font-semibold text-gray-700">SMSD PROVES</span>
                    <div className="ml-4 h-px bg-gray-300 flex-1"></div>
                </div>
            </div>

            {/* Latest News Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-2 border-b border-gray-200">
                    Latest News
                </h2>

                {/* News Items */}
                <div className="space-y-10">
                    {newsItems.map((item, index) => (
                        <div key={index} className="group">
                            {/* News Header */}
                            <div className="flex items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                        <span className="font-medium text-gray-700">{item.author}</span>
                                        <span className="mx-2">•</span>
                                        <span>{item.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{item.comments} comments</span>
                                    </div>
                                </div>
                                {index === 0 && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded ml-2">
                                        New
                                    </span>
                                )}
                            </div>

                            {/* News Content */}
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {item.content}
                            </p>

                            {/* Separator */}
                            {index < newsItems.length - 1 && (
                                <div className="h-px bg-gray-200 w-full"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MacbookProPage;