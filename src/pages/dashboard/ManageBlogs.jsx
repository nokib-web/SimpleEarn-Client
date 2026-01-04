import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineMagnifyingGlass, HiOutlinePhoto, HiOutlineXMark } from 'react-icons/hi2';
import { uploadImageToImgBB } from '../../utils/imgbb';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    // Form States
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        tags: '',
        readTime: ''
    });

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/blogs');
            setBlogs(data.blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setStatusMsg({ type: 'error', text: 'Failed to load protocol records' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        if (statusMsg.text) {
            const timer = setTimeout(() => setStatusMsg({ type: '', text: '' }), 5000);
            return () => clearTimeout(timer);
        }
    }, [statusMsg]);

    const resetForm = () => {
        setFormData({ title: '', content: '', image: '', tags: '', readTime: '' });
        setEditingBlog(null);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFormLoading(true);
        try {
            const url = await uploadImageToImgBB(file);
            setFormData({ ...formData, image: url });
            setStatusMsg({ type: 'success', text: 'Visual asset synchronized' });
        } catch (error) {
            setStatusMsg({ type: 'error', text: 'Asset linkage failed' });
        } finally {
            setFormLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            };

            if (editingBlog) {
                await api.put(`/blogs/${editingBlog._id}`, payload);
                setStatusMsg({ type: 'success', text: 'Protocol entry updated' });
            } else {
                await api.post('/blogs', payload);
                setStatusMsg({ type: 'success', text: 'New entry broadcasted' });
            }
            setShowModal(false);
            resetForm();
            fetchBlogs();
        } catch (error) {
            setStatusMsg({ type: 'error', text: 'Transaction commit failed' });
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Terminate this protocol record?')) return;
        try {
            await api.delete(`/blogs/${id}`);
            setStatusMsg({ type: 'success', text: 'Record purged from network' });
            fetchBlogs();
        } catch (error) {
            setStatusMsg({ type: 'error', text: 'Purge request rejected' });
        }
    };

    const openEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            image: blog.image,
            tags: blog.tags?.join(', ') || '',
            readTime: blog.readTime
        });
        setShowModal(true);
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Manage Blogs</h1>
                    <p className="text-[#64748B] text-sm font-medium mt-1">Direct authority over protocol publications and documentation.</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="btn-primary flex items-center gap-2 group !py-3 !px-6"
                >
                    <HiOutlinePlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    New Publication
                </button>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
                {statusMsg.text && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-4 rounded-2xl border flex items-center gap-3 font-bold text-sm ${statusMsg.type === 'error'
                                ? 'bg-red-50 border-red-100 text-red-600'
                                : 'bg-[#14B8A6]/5 border-[#14B8A6]/10 text-[#14B8A6]'
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm`}>
                            {statusMsg.type === 'error' ? '⚠️' : '⚡'}
                        </div>
                        {statusMsg.text}
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? (
                <div className="py-20 text-center animate-pulse text-[#64748B] font-black uppercase tracking-widest text-[10px]">Accessing Record Sets...</div>
            ) : (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-50">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Record Title</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Tags</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Creation Alpha</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Governance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {blogs.map(blog => (
                                    <tr key={blog._id} className="group hover:bg-[#F8FAFC] transition-colors">
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <img src={blog.image} className="w-12 h-12 rounded-xl object-cover" />
                                                <div>
                                                    <p className="text-sm font-black text-[#0F172A]">{blog.title}</p>
                                                    <p className="text-[10px] text-[#94A3B8] font-bold uppercase">{blog.readTime}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                {blog.tags?.slice(0, 2).map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 bg-[#7C3AED]/5 text-[#7C3AED] text-[9px] font-black rounded-md uppercase">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <p className="text-xs font-bold text-[#64748B]">{new Date(blog.createdAt).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openEdit(blog)} className="p-2.5 bg-white border border-gray-100 rounded-xl text-[#64748B] hover:text-[#7C3AED] hover:border-[#7C3AED]/20 transition-all">
                                                    <HiOutlinePencil className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(blog._id)} className="p-2.5 bg-white border border-gray-100 rounded-xl text-[#64748B] hover:text-red-500 hover:border-red-100 transition-all">
                                                    <HiOutlineTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Editor Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
                        >
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-xl font-black text-[#0F172A] tracking-tighter">
                                    {editingBlog ? 'Edit Entry' : 'New Protocol Publication'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                    <HiOutlineXMark className="w-6 h-6 text-[#64748B]" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-2">Publication Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter high-fidelity title..."
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] outline-none transition-all font-bold text-[#0F172A]"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-2">Record Tags (comma-separated)</label>
                                        <input
                                            type="text"
                                            placeholder="Update, Guide, Protocol..."
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] outline-none transition-all font-bold text-[#0F172A]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-2">Metric: Read Time</label>
                                        <input
                                            type="text"
                                            placeholder="5 min read"
                                            value={formData.readTime}
                                            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                            className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] outline-none transition-all font-bold text-[#0F172A]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-2">Visual Descriptor (Cover Image)</label>
                                    <div className="flex gap-4">
                                        <div className="w-24 h-24 bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <HiOutlinePhoto className="w-8 h-8 text-[#94A3B8]" />}
                                        </div>
                                        <label className="flex-1 flex flex-col items-center justify-center bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-2xl cursor-pointer hover:bg-[#F1F5F9] transition-all group">
                                            <span className="text-xs font-black text-[#64748B]">Link Protocol Image...</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] ml-2">Publication Content (HTML Supported)</label>
                                    <textarea
                                        required
                                        rows="6"
                                        placeholder="Record details here..."
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] outline-none transition-all font-medium text-[#0F172A]"
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        disabled={formLoading}
                                        className="btn-primary w-full py-5 text-sm uppercase tracking-widest shadow-2xl shadow-purple-500/20 disabled:opacity-50"
                                    >
                                        {formLoading ? 'Synchronizing...' : (editingBlog ? 'Update Protocol Record' : 'Commit to Protocol')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageBlogs;
