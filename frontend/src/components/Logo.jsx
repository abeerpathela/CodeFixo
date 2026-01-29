import React from 'react';

const Logo = ({ className = "", showText = true, size = "md" }) => {
    const iconSizes = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };

    const textSizes = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl"
    };

    return (
        <div className={`flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] ${className}`}>
            <div className="relative group">
                {/* Designer geometric icon */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${iconSizes[size]} drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]`}
                >
                    <defs>
                        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#2dd4bf" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Outer stylized C */}
                    <path
                        d="M80 20C70 10 55 5 40 5C20 5 5 20 5 40V60C5 80 20 95 40 95C60 95 75 85 85 70"
                        stroke="url(#logoGrad)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        className="group-hover:stroke-white transition-all duration-500"
                    />

                    {/* The "Fix" element - a diamond/rhombus representing a solved unit */}
                    <path
                        d="M60 40L80 60L60 80L40 60L60 40Z"
                        fill="url(#logoGrad)"
                        className="animate-pulse"
                    />

                    {/* Inner core */}
                    <circle cx="60" cy="60" r="8" fill="white" className="group-hover:scale-150 transition-transform origin-center" />
                </svg>
            </div>

            {showText && (
                <span className={`${textSizes[size]} font-black tracking-[ -0.05em] uppercase italic`}>
                    <span className="text-white">Code</span>
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">Fixo</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
