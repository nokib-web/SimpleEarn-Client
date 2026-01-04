import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { uploadImageToImgBB } from '../utils/imgbb';
import Container from '../components/Container';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlinePhoto, HiOutlineShieldCheck, HiOutlineArrowRight } from 'react-icons/hi2';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      let photoURL = '';
      if (data.photo && data.photo[0]) {
        photoURL = await uploadImageToImgBB(data.photo[0]);
      }

      await registerUser(data.email, data.password, data.name, photoURL, data.role);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Identity already exists in protocol. Try logging in.');
      } else {
        setError('Connection failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#FDFDFF] min-h-[calc(100vh-80px)] flex items-center">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[4rem] shadow-2xl shadow-purple-100 border border-gray-100 overflow-hidden flex flex-col lg:flex-row">

            {/* Left Side: Brand Visual */}
            <div className="lg:w-5/12 bg-[#0F172A] p-12 text-white relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED] rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#14B8A6] rounded-full blur-[100px] opacity-10 -ml-32 -mb-32"></div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-12 inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
                >
                  <div className="w-2 h-2 bg-[#14B8A6] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#14B8A6]">Encrypted Connection</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                  Start Your <span className="text-[#7C3AED]">Node</span> Today.
                </h1>
                <p className="text-[#64748B] text-lg font-medium leading-relaxed mb-8">
                  Join the decentralized protocol for global micro-tasking. Instant settlement, high-fidelity verification.
                </p>
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#7C3AED] border border-white/10">
                    <HiOutlineShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black tracking-tight">AES-256 Security</p>
                    <p className="text-xs text-[#64748B]">Protocol grade protection</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-xl border-2 border-[#0F172A] bg-[#1E293B] overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-xl border-2 border-[#0F172A] bg-[#7C3AED] flex items-center justify-center text-[10px] font-black">
                      +50k
                    </div>
                  </div>
                  <p className="text-[10px] text-[#64748B] mt-4 font-black uppercase tracking-widest">Active nodes in network</p>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:w-7/12 p-12 md:p-16">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-[#0F172A] tracking-tighter mb-2">Initialize Account</h2>
                <p className="text-[#64748B] font-medium">Configure your network identity to start earning.</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-pulse-soft"
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">⚠️</div>
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-2">Display Name</label>
                    <div className="relative group">
                      <HiOutlineUser className="absolute left-6 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#7C3AED] text-[#94A3B8]" />
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all font-bold text-[#0F172A]"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-2">Protocol Role</label>
                    <select
                      {...register('role', { required: 'Role is required' })}
                      className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all font-black text-[#0F172A] appearance-none"
                    >
                      <option value="worker">Worker Node</option>
                      <option value="buyer">Task Buyer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-2">Email Identity</label>
                  <div className="relative group">
                    <HiOutlineEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#7C3AED] text-[#94A3B8]" />
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all font-bold text-[#0F172A]"
                      placeholder="john@protocol.io"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-2">Avatar Profile</label>
                  <label className="flex items-center gap-4 p-4 bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-2xl cursor-pointer hover:bg-[#F1F5F9] transition-all group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#94A3B8] shadow-sm group-hover:text-[#7C3AED] transition-colors overflow-hidden">
                      {previewImage ? <img src={previewImage} className="w-full h-full object-cover" /> : <HiOutlinePhoto className="w-6 h-6" />}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-[#64748B]">Choose system avatar...</p>
                      <p className="text-[10px] text-[#94A3B8] font-medium">SVG, PNG, JPG (max 2MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" {...register('photo')} onChange={handleImageChange} />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-2">Security Key</label>
                    <div className="relative group">
                      <HiOutlineLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#7C3AED] text-[#94A3B8]" />
                      <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all font-bold text-[#0F172A]"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] ml-2">Verify Key</label>
                    <input
                      type="password"
                      className="w-full px-6 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all font-bold text-[#0F172A]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em] shadow-2xl shadow-purple-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Connect to Protocol
                        <HiOutlineArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-xs font-bold text-[#64748B]">
                  Previously registered? <Link to="/login" className="text-[#7C3AED] hover:underline underline-offset-4">Access Terminal</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
