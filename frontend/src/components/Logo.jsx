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
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>

                    {/* Designer abstract mark */}
                    <circle cx="50" cy="50" r="48" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />

                    <path
                        d="M35 40C35 30 45 25 55 25C70 25 80 35 80 50C80 65 70 75 55 75C45 75 35 70 35 60"
                        stroke="url(#logoGrad)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="group-hover:stroke-white transition-all duration-700 ease-in-out"
                    />

                    <rect
                        x="48" y="48" width="16" height="16"
                        fill="url(#logoGrad)"
                        className="animate-[pulse_2s_ease-in-out_infinite] origin-center rotate-45"
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                </svg>
            </div>

            {showText && (
                <span className={`${textSizes[size]} font-black tracking-tight leading-none`}>
                    <span className="text-white uppercase">CODE</span>
                    <span className="bg-gradient-to-br from-indigo-400 to-pink-400 bg-clip-text text-transparent ml-1 uppercase">FIXO</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
