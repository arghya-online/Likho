import React from 'react';
import { Link } from 'react-router-dom';

// Simple SVG to represent writing/blogging (a pen nib)
const PenNibSVG = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);

function HeroSection() {
    return (
        <div className="w-full py-20 md:py-32 lg:py-40 bg-gray-900 text-white min-h-[80vh] flex items-center justify-center relative overflow-hidden">
            {/* Background Grid Pattern for visual interest */}
            <div 
                className="absolute inset-0 z-0 opacity-10" 
                style={{ 
                    backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0.5px)', 
                    backgroundSize: '25px 25px', 
                    color: '#1f2937' 
                }}
            ></div>

            {/* Content Container */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                
                {/* Animated SVG Icon */}
                <div className="mx-auto mb-6 text-teal-400 animate-bounce-slow">
                    <PenNibSVG className="w-16 h-16 mx-auto"/>
                </div>

                {/* Headline with Gradient Text */}
                <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                        Likho: 
                    </span> 
                    Write, Share, Inspire.
                </h1>

                {/* Subtitle/Description */}
                <p className="mt-4 text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                    Likho is your dedicated platform for powerful storytelling. Craft compelling articles, connect with a global audience, and manage your content seamlessly.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex justify-center space-x-6">
                    {/* Primary CTA: Sign Up - Target is correctly set to /signup */}
                    <Link
                        to="/signup"
                        className="px-10 py-3 font-bold text-lg md:text-xl rounded-full shadow-2xl bg-teal-600 text-gray-900 
                                   hover:bg-teal-500 transform hover:scale-[1.02] transition-all duration-300 
                                   ring-4 ring-offset-2 ring-offset-gray-900 ring-teal-600"
                    >
                        Start Writing Now
                    </Link>
                    
                    {/* Secondary CTA: View Posts */}
                    <Link
                        to="/all-posts"
                        className="px-10 py-3 font-bold text-lg md:text-xl rounded-full border-2 border-teal-500 text-teal-400 
                                   hover:bg-teal-500 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
                    >
                        Explore Posts
                    </Link>
                </div>
            </div>
            
            {/* CSS Animation for the SVG */}
            <style jsx="true">
            {`
                @keyframes bounceSlow {
                    0%, 100% {
                        transform: translateY(-5%);
                    }
                    50% {
                        transform: translateY(5%);
                    }
                }
                .animate-bounce-slow {
                    animation: bounceSlow 3s ease-in-out infinite;
                }
            `}
            </style>
        </div>
    );
}

export default HeroSection;
