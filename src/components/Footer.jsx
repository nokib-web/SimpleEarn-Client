import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-[#0F172A] text-white pt-24 pb-12 font-sans border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Logo className="[&_span]:text-white" />
                        <p className="text-[#94A3B8] leading-relaxed font-medium text-[15px]">
                            Protocol-grade micro-tasking. Empowering a global workforce with high-fidelity validation and instant cross-border settlement.
                        </p>
                        <div className="flex space-x-5">
                            <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#7C3AED] transition-all duration-300 border border-white/10 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#14B8A6] transition-all duration-300 border border-white/10 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-10 text-white opacity-40">Network</h4>
                        <ul className="space-y-5">
                            <li><Link to="/how-it-works" className="text-[#94A3B8] hover:text-[#7C3AED] transition-all font-bold text-[15px]">Protocol Docs</Link></li>
                            <li><Link to="/about" className="text-[#94A3B8] hover:text-[#7C3AED] transition-all font-bold text-[15px]">Our Mission</Link></li>
                            <li><Link to="/register" className="text-[#94A3B8] hover:text-[#7C3AED] transition-all font-bold text-[15px]">Launchpad</Link></li>
                            <li><Link to="/register" className="text-[#94A3B8] hover:text-[#7C3AED] transition-all font-bold text-[15px]">Terminal Access</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-10 text-white opacity-40">Governance</h4>
                        <ul className="space-y-5">
                            <li><Link to="/contact" className="text-[#94A3B8] hover:text-[#7C3AED] transition-all font-bold text-[15px]">Core Support</Link></li>
                            <li><Link to="/contact" className="text-[#94A3B8] hover:text-[#7C3AED] transition-all font-bold text-[15px]">Security Center</Link></li>
                            <li><a href="#" className="text-[#94A3B8] hover:text-[#7C3AED] transition-all font-bold text-[15px]">Legal Protocol</a></li>
                            <li><a href="#" className="text-[#94A3B8] hover:text-[#7C3AED] transition-all font-bold text-[15px]">Privacy Layer</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-10 text-white opacity-40">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-[#94A3B8] font-bold text-[15px]">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#7C3AED] flex-shrink-0 border border-white/5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <span className="mt-2 text-sm">Tech Square, Silicon Valley, CA 94043</span>
                            </li>
                            <li className="flex items-center gap-4 text-[#94A3B8] font-bold text-[15px]">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#14B8A6] flex-shrink-0 border border-white/5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <span className="text-sm">support@protocol.earn</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[#475569] text-xs font-black uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} SimpleEarn Protocol. All cycles reserved.
                    </p>
                    <div className="flex gap-10 text-[11px] font-black text-[#475569] uppercase tracking-[0.2em] items-center">
                        <Link to="/register" className="hover:text-white transition-all flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#14B8A6] rounded-full"></span>
                            Status: Live
                        </Link>
                        <Link to="/about" className="hover:text-white transition-all">Security</Link>
                        <Link to="/contact" className="hover:text-white transition-all">Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
