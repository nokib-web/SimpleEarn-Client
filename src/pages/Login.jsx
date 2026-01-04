import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineArrowRight, HiOutlineShieldCheck } from 'react-icons/hi2';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="py-12 md:py-24 bg-[#FDFDFF] dark:bg-[#0F172A] min-h-[calc(100vh-80px)] flex items-center transition-colors duration-300">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-[#1E293B] rounded-[4rem] shadow-2xl shadow-purple-100 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col lg:flex-row">

            {/* Left Side: Security Badge Visual */}
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
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#14B8A6]">Identity Verified</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                  Secure <span className="text-[#14B8A6]">Portal</span> Access.
                </h1>
                <p className="text-[#64748B] text-lg font-medium leading-relaxed mb-8">
                  Login to your protocol node to manage assets, verify tasks, and scale your earnings.
                </p>
              </div>

              <div className="relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#14B8A6] border border-white/10">
                      <HiOutlineShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black tracking-tight">Encrypted Session</p>
                      <p className="text-xs text-[#64748B]">Active protection enabled</p>
                    </div>
                  </div>
                  <div className="bg-[#14B8A6]/10 rounded-2xl p-6 border border-[#14B8A6]/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">System Status</span>
                      <span className="w-2 h-2 bg-[#14B8A6] rounded-full"></span>
                    </div>
                    <p className="text-xs font-bold text-white/60 leading-relaxed">
                      Protocol nodes are online. Verification latency: 12ms. Global network synchronized.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="lg:w-7/12 p-12 md:p-16">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-[#0F172A] dark:text-white tracking-tighter mb-2">Welcome Back</h2>
                <p className="text-[#64748B] dark:text-[#94A3B8] font-medium">Authentication required to bridge to protocol.</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
                >
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">⚠️</div>
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] dark:text-[#94A3B8] ml-2">Email Identity</label>
                  <div className="relative group">
                    <HiOutlineEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#7C3AED] text-[#94A3B8] dark:text-[#64748B]" />
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-gray-700/50 rounded-2xl focus:bg-white dark:focus:bg-[#1E293B] focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all font-bold text-[#0F172A] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="john@protocol.io"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B] dark:text-[#94A3B8]">Security Key</label>
                    <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED] hover:underline">Forgot Key?</Link>
                  </div>
                  <div className="relative group">
                    <HiOutlineLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#7C3AED] text-[#94A3B8] dark:text-[#64748B]" />
                    <input
                      type="password"
                      {...register('password', { required: 'Password is required' })}
                      className="w-full pl-14 pr-6 py-4 bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-gray-700/50 rounded-2xl focus:bg-white dark:focus:bg-[#1E293B] focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all font-bold text-[#0F172A] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em] shadow-2xl shadow-purple-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Establish Connection
                        <HiOutlineArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-5 border border-[#E2E8F0] dark:border-gray-700 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A] transition-all font-black text-xs uppercase tracking-widest text-[#64748B] dark:text-[#94A3B8]"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google Authorization
                  </button>
                </div>

                <p className="text-center text-xs font-bold text-[#64748B] dark:text-[#94A3B8]">
                  New to Protocol? <Link to="/register" className="text-[#14B8A6] hover:underline underline-offset-4">Bootstrap Node</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
