import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Container from '../components/Container';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlineShare, HiOutlineCalendar, HiOutlineTag } from 'react-icons/hi2';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await api.get(`/blogs/${id}`);
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <div className="py-40 text-center text-[#64748B] font-black uppercase tracking-widest animate-pulse">Synchronizing with protocol...</div>;
    }

    if (!blog) {
        return (
            <div className="py-40 text-center">
                <h1 className="text-2xl font-black text-[#0F172A] mb-4">Entry Not Found</h1>
                <Link to="/blog" className="text-[#7C3AED] font-bold hover:underline">Return to feed</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-20 left-0 right-0 h-1 bg-[#7C3AED] z-[1001] origin-left"
                style={{ scaleX }}
            />

            {/* Header / Hero */}
            <header className="relative py-20 bg-[#F8FAFC] overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] -z-1"></div>
                <Container>
                    <Link to="/blog" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] hover:text-[#7C3AED] transition-colors mb-12">
                        <HiOutlineArrowLeft className="w-4 h-4" />
                        Back to Protocol Feed
                    </Link>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-wrap gap-2 mb-8"
                        >
                            {blog.tags?.map(tag => (
                                <span key={tag} className="px-4 py-1.5 bg-[#7C3AED]/5 border border-[#7C3AED]/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#7C3AED]">
                                    {tag}
                                </span>
                            ))}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter mb-10 leading-[1.1]"
                        >
                            {blog.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center flex-wrap gap-8 text-[11px] font-black uppercase tracking-widest text-[#64748B]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                    <img src={blog.author?.image || `https://ui-avatars.com/api/?name=${blog.author?.name}`} />
                                </div>
                                <div>
                                    <p className="text-[#0F172A]">{blog.author?.name}</p>
                                    <p className="opacity-60">Protocol Authority</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <HiOutlineCalendar className="w-5 h-5 text-[#7C3AED]" />
                                <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <HiOutlineClock className="w-5 h-5 text-[#7C3AED]" />
                                <span>{blog.readTime}</span>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </header>

            {/* Content */}
            <main className="py-20">
                <Container>
                    <div className="grid lg:grid-cols-[1fr_300px] gap-20">
                        {/* Article Content */}
                        <article className="max-w-3xl">
                            <div className="rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-purple-100 border border-gray-100">
                                <img src={blog.image} alt={blog.title} className="w-full object-cover" />
                            </div>

                            <div
                                className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-[#0F172A] prose-p:text-[#64748B] prose-p:leading-relaxed prose-a:text-[#7C3AED] prose-strong:text-[#0F172A]"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#64748B] hover:text-[#7C3AED] hover:border-[#7C3AED] transition-all">
                                        <HiOutlineShare className="w-4 h-4" />
                                        Distribute
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    {/* Social icons placeholder */}
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="space-y-12">
                            <div className="p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2.5rem]">
                                <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-widest mb-6">Article Metadata</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-200/50">
                                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Protocol Version</span>
                                        <span className="text-[10px] font-bold text-[#0F172A]">v2.4.0</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-200/50">
                                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Visibility</span>
                                        <span className="text-[10px] font-bold text-[#14B8A6]">Global Network</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-200/50">
                                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Verification</span>
                                        <span className="text-[10px] font-bold text-[#7C3AED]">Signed PKI</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-1 w-full bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] rounded-[2.5rem]">
                                <div className="p-8 bg-[#0F172A] rounded-[2.3rem] text-white">
                                    <h3 className="text-xl font-black mb-4 tracking-tighter leading-tight">Join the Protocol Evolution.</h3>
                                    <p className="text-[#64748B] text-sm font-medium mb-8 leading-relaxed">Stay updated with the latest in decentralized micro-tasking and automated settlements.</p>
                                    <Link to="/register" className="btn-primary w-full !py-4 text-[11px] uppercase tracking-widest">Initialize Node</Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default BlogDetails;
