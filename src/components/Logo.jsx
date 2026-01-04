import { Link } from 'react-router-dom';

const Logo = ({ className = "" }) => {
    return (
        <Link to="/" className={`flex items-center gap-3 group ${className}`}>
            <div className="relative">
                {/* Main Logo Icon with Gradient */}
                <div className="w-11 h-11 bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] rounded-[14px] flex items-center justify-center shadow-lg shadow-purple-200/50 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                {/* Modern Status Accent (Teal) */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#14B8A6] border-2 border-white dark:border-[#0F172A] rounded-full shadow-sm animate-pulse-soft"></div>
            </div>
            <span className="text-[26px] font-black tracking-tighter text-[#0F172A] dark:text-white flex items-center">
                Simple<span className="text-[#7C3AED]">Earn</span>
                <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full ml-1 self-end mb-1.5 animate-bounce"></span>
            </span>
        </Link>
    );
};

export default Logo;
