import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineHome, HiOutlineSparkles, HiOutlineLightBulb, HiOutlineEnvelope } from 'react-icons/hi2';

const Navbar = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <HiOutlineHome className="w-5 h-5" /> },
        { name: 'About', path: '/about', icon: <HiOutlineSparkles className="w-5 h-5" /> },
        { name: 'How It Works', path: '/how-it-works', icon: <HiOutlineLightBulb className="w-5 h-5" /> },
        { name: 'Contact', path: '/contact', icon: <HiOutlineEnvelope className="w-5 h-5" /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-[1000] border-b border-gray-100 h-20 flex items-center shadow-sm">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-12">
                            <Logo />

                            <div className="hidden lg:flex items-center space-x-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`text-[15px] font-bold transition-all relative group ${isActive(link.path) ? 'text-[#7C3AED]' : 'text-[#64748B] hover:text-[#7C3AED]'
                                            }`}
                                    >
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#7C3AED] transition-all ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}></span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden lg:flex items-center space-x-4">
                                {userData ? (
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-[#F8FAFC] border border-[#7C3AED]/10 px-4 py-2 rounded-2xl">
                                            <span className="text-[#64748B] text-xs font-black uppercase tracking-widest mr-2">Wallet:</span>
                                            <span className="text-[#7C3AED] font-black">{userData.coin.toLocaleString()}</span>
                                            <span className="text-[#14B8A6] text-[10px] font-black ml-1 uppercase">Coins</span>
                                        </div>

                                        <div className="relative">
                                            <button
                                                onClick={() => setShowDropdown(!showDropdown)}
                                                className="flex items-center gap-2 p-1 bg-white border border-gray-100 rounded-[1.25rem] hover:shadow-lg transition-all"
                                            >
                                                <img
                                                    src={userData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`}
                                                    alt={userData.name}
                                                    className="w-10 h-10 rounded-[1rem] object-cover"
                                                />
                                                <svg className={`w-5 h-5 text-gray-400 mr-2 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            <AnimatePresence>
                                                {showDropdown && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 py-4 z-50 overflow-hidden"
                                                    >
                                                        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-[#7C3AED]/10 rounded-xl flex items-center justify-center text-[#7C3AED] font-black text-xs">
                                                                {userData.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-[#0F172A] leading-none mb-1">{userData.name}</p>
                                                                <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">{userData.role}</p>
                                                            </div>
                                                        </div>
                                                        <div className="p-2">
                                                            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#7C3AED] transition-all">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                                Dashboard
                                                            </Link>
                                                            <button
                                                                onClick={handleLogout}
                                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-red-500 hover:bg-red-50 transition-all"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                                Logout
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Link
                                            to="/login"
                                            className="text-[15px] font-black text-[#64748B] hover:text-[#7C3AED] px-4"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="btn-primary !py-3 !px-8 text-[15px] shadow-lg shadow-purple-500/20"
                                        >
                                            Join Protocol
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden p-2 text-[#64748B] hover:text-[#7C3AED] hover:bg-purple-50 rounded-xl transition-all"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {showDropdown && (
                    <div
                        className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]"
                        onClick={() => setShowDropdown(false)}
                    />
                )}
            </nav>

            {/* Mobile Sidebar Navigation - Rendered OUTSIDE sticky nav for maximum z-priority */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-[100000] lg:hidden">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-2xl"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute top-0 right-0 bottom-0 w-[320px] bg-[#0F172A] shadow-2xl flex flex-col overflow-hidden border-l border-white/5"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED] rounded-full blur-[100px] opacity-10 -mr-20 -mt-20"></div>

                            <div className="p-8 flex flex-col h-full relative z-10">
                                <div className="flex justify-between items-center mb-10">
                                    <Logo className="[&_span]:text-white" />
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {userData && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/10 shadow-inner mb-10"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="relative">
                                                <img
                                                    src={userData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`}
                                                    alt={userData.name}
                                                    className="w-14 h-14 rounded-2xl object-cover shadow-lg ring-2 ring-[#7C3AED]/20"
                                                />
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#14B8A6] border-2 border-[#0F172A] rounded-full animate-pulse-soft"></div>
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-white tracking-tight">{userData.name}</p>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7C3AED]">Verified {userData.role}</p>
                                            </div>
                                        </div>
                                        <div className="bg-[#14B8A6]/10 rounded-2xl p-4 flex justify-between items-center border border-[#14B8A6]/20">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">Assets</span>
                                            <div className="flex items-center gap-1.5 font-black">
                                                <span className="text-xl text-white leading-none">{userData.coin.toLocaleString()}</span>
                                                <span className="text-[9px] uppercase text-[#14B8A6]">Coins</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="flex flex-col space-y-1.5 flex-grow">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 px-4">Navigation</p>
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 + 0.2 }}
                                        >
                                            <Link
                                                to={link.path}
                                                className={`flex items-center gap-4 px-6 py-4.5 rounded-[1.5rem] font-bold text-[16px] transition-all relative group ${isActive(link.path)
                                                    ? 'bg-[#7C3AED] text-white shadow-[0_0_30px_rgba(124,58,237,0.3)]'
                                                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                                                    }`}
                                            >
                                                <span className={`${isActive(link.path) ? 'text-white' : 'text-[#7C3AED]'} opacity-70 group-hover:opacity-100 transition-colors`}>{link.icon}</span>
                                                {link.name}
                                                {isActive(link.path) && (
                                                    <motion.div layoutId="mobile-indicator" className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5">
                                    {userData ? (
                                        <div className="space-y-4">
                                            <Link to="/dashboard" className="btn-primary flex justify-center py-4.5 w-full uppercase tracking-widest text-xs shadow-xl shadow-purple-900/40">
                                                Enter Terminal
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full py-4 text-white/30 font-black text-[10px] uppercase tracking-[0.4em] hover:text-red-400 transition-colors"
                                            >
                                                Kill Session
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <Link to="/login" className="flex justify-center font-black text-white/60 text-[14px] py-4 hover:text-white transition-colors">
                                                Login Account
                                            </Link>
                                            <Link to="/register" className="btn-secondary flex justify-center py-4.5 w-full">
                                                Bootstrap Node
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
