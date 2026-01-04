import { useState, useEffect } from 'react';
import api from '../utils/api';
import Container from '../components/Container';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineMagnifyingGlass, HiOutlineClock, HiOutlineUserCircle, HiOutlineArrowRight } from 'react-icons/hi2';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/blogs?search=${search}&page=${page}`);
            setBlogs(data.blogs);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchBlogs();
    };

    return (
        <div className="py-20 bg-[#FDFDFF] dark:bg-[#0F172A] min-h-screen transition-colors duration-300">
            <Container>
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#7C3AED]/5 border border-[#7C3AED]/10 rounded-full mb-6"
                    >
                        <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED]">Protocol Publication</span>
                    </motion.div>
                    <h1 className="text-5xl font-black text-[#0F172A] dark:text-white tracking-tighter mb-6 leading-tight">
                        Insights from the <span className="text-[#7C3AED]">Protocol</span>.
                    </h1>
                    <p className="text-[#64748B] dark:text-[#94A3B8] text-lg font-medium leading-relaxed">
                        Explore our latest updates, decentralized economy guides, and system documentation.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-20">
                    <form onSubmit={handleSearch} className="relative group">
                        <HiOutlineMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-[#94A3B8] dark:text-[#64748B] group-focus-within:text-[#7C3AED] transition-colors w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Search articles, nodes, documentation..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-16 pr-6 py-5 bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-gray-800 rounded-3xl shadow-xl shadow-purple-50 dark:shadow-none focus:ring-4 focus:ring-[#7C3AED]/5 focus:border-[#7C3AED] outline-none transition-all font-bold text-[#0F172A] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                        />
                        <button type="submit" className="absolute right-3 top-3 bottom-3 bg-[#0F172A] dark:bg-[#7C3AED] text-white px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#7C3AED] hover:dark:bg-[#6D28D9] transition-all">
                            Filter
                        </button>
                    </form>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-white dark:bg-[#1E293B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 h-[400px]"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-3 gap-10">
                            {blogs.map((blog, idx) => (
                                <motion.article
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-white dark:bg-[#1E293B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-purple-100 dark:hover:shadow-none dark:hover:border-purple-500/30 transition-all duration-500 overflow-hidden flex flex-col"
                                >
                                    <div className="h-56 relative overflow-hidden">
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-6 left-6 flex gap-2">
                                            {blog.tags?.slice(0, 2).map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-[#0F172A]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 mb-4 text-[#94A3B8] dark:text-[#64748B] text-[10px] font-black uppercase tracking-widest">
                                            <div className="flex items-center gap-1.5">
                                                <HiOutlineClock className="w-4 h-4 text-[#7C3AED]" />
                                                <span>{blog.readTime}</span>
                                            </div>
                                            <span>•</span>
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h2 className="text-xl font-black text-[#0F172A] dark:text-white tracking-tight group-hover:text-[#7C3AED] transition-colors mb-4 leading-snug">
                                            {blog.title}
                                        </h2>
                                        <p className="text-[#64748B] dark:text-[#94A3B8] text-sm font-medium line-clamp-3 mb-8">
                                            {blog.content.replace(/<[^>]*>/g, '')}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                                                    <img src={blog.author?.image || `https://ui-avatars.com/api/?name=${blog.author?.name}`} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] dark:text-white">{blog.author?.name}</span>
                                            </div>
                                            <Link to={`/blog/${blog._id}`} className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] flex items-center justify-center text-[#94A3B8] group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                                                <HiOutlineArrowRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        {blogs.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-[#1E293B] rounded-[4rem] border border-dashed border-gray-200 dark:border-gray-800">
                                <p className="text-[#64748B] dark:text-[#94A3B8] font-bold">No protocol entries found matching your filters.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-20 flex justify-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-12 h-12 rounded-xl font-black text-xs transition-all ${page === i + 1
                                            ? 'bg-[#7C3AED] text-white shadow-lg shadow-purple-500/20'
                                            : 'bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 text-[#64748B] dark:text-[#94A3B8] hover:border-[#7C3AED] hover:text-[#7C3AED]'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default BlogList;
