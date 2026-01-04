import { useEffect, useState, useRef } from 'react';
import api from '../utils/api';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import {
  HiOutlineCpuChip,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
  HiOutlineBolt,
  HiOutlineBanknotes,
  HiOutlineUserGroup
} from 'react-icons/hi2';

const Counter = ({ value, label, prefix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = count / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= count) {
          setDisplayValue(count);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, count]);

  return (
    <div ref={ref} className="space-y-1">
      <p className="text-3xl font-black text-white leading-none">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </p>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
    </div>
  );
};

const Home = () => {
  const [topWorkers, setTopWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchTopWorkers = async () => {
      try {
        const response = await api.get('/users/top-workers');
        setTopWorkers(response.data);
      } catch (error) {
        console.error('Error fetching top workers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopWorkers();
  }, []);

  const faqData = [
    {
      q: "How do I start earning as a worker?",
      a: "Simply sign up as a worker, complete your profile, and start browsing available tasks in your dashboard. Once you finish a task and submit proof, the buyer will review it and release your coins."
    },
    {
      q: "Is there a limit to how many tasks I can complete?",
      a: "No! You can complete as many tasks as you want. Some tasks might have a one-time completion limit per worker, but you can always find new ones."
    },
    {
      q: "How do I get paid for the coins I earn?",
      a: "Once you reach the minimum withdrawal threshold, you can request a withdrawal via your dashboard. We support various payment methods including Stripe, PayPal, and more."
    },
    {
      q: "Can I be both a buyer and a worker?",
      a: "Currently, your account role is fixed at registration. If you'd like to use both features, you can create two separate accounts with different email addresses."
    }
  ];

  return (
    <div className="bg-[#FDFDFF] overflow-hidden">
      {/* Professional Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 pb-32 overflow-hidden bg-[#0F172A]">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#7C3AED]/20 to-transparent blur-[120px] rounded-full"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-[100px] animate-pulse-soft"></div>
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-8">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8A6]"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Protocol v2.4 Live: Global Settlement Enabled</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
                  The Future of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#14B8A6]">Distributed Work</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl font-medium leading-relaxed">
                  Join the world's most advanced micro-tasking protocol.
                  High-fidelity validation meets instant liquidity for a truly global workforce.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Link
                    to="/register"
                    className="btn-primary flex items-center justify-center gap-3 !py-5 !px-12 text-lg group shadow-[0_0_40px_rgba(124,58,237,0.3)]"
                  >
                    Bootstrap Node
                    <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="flex items-center justify-center gap-3 px-12 py-5 bg-white/5 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all backdrop-blur-md border border-white/10"
                  >
                    View Protocol Docs
                  </Link>
                </div>

                <div className="mt-16 flex items-center gap-12 border-t border-white/5 pt-12">
                  <Counter value="50000+" label="Active Nodes" />
                  <div className="w-[1px] h-10 bg-white/5"></div>
                  <Counter value="1200000" label="Tasks Validated" />
                  <div className="w-[1px] h-10 bg-white/5"></div>
                  <Counter value="4800000+" label="Node Revenue" prefix="$" />
                </div>
              </motion.div>
            </div>

            {/* Visual element side */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="relative z-10"
              >
                {/* Protocol Interface Mockup */}
                <div className="bg-[#1E293B] rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent opacity-50"></div>

                  <div className="flex items-center justify-between mb-10">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/20"></div>
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[8px] font-black uppercase tracking-widest text-[#14B8A6]">
                      Secure Session: Active
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 group-hover:bg-white/10 transition-colors">
                      <div className="w-12 h-12 bg-[#7C3AED]/20 rounded-xl flex items-center justify-center text-[#7C3AED]">
                        <HiOutlineBolt className="w-6 h-6" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-2">
                          <span className="text-[10px] font-black uppercase text-slate-400">Task Acceleration</span>
                          <span className="text-[10px] font-black text-[#7C3AED]">98.4%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '98.4%' }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="h-full bg-[#7C3AED] rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#14B8A6]/20 rounded-xl flex items-center justify-center text-[#14B8A6]">
                        <HiOutlineBanknotes className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Distributed</p>
                        <p className="text-2xl font-black text-white">412,890.00 <span className="text-xs text-slate-500">Coins</span></p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <HiOutlineUserGroup className="w-5 h-5 text-slate-500 mb-3" />
                        <p className="text-sm font-black text-white">12,402</p>
                        <p className="text-[8px] font-black uppercase text-slate-500">Verified Workers</p>
                      </div>
                      <div className="p-4 bg-[#7C3AED]/10 rounded-2xl border border-[#7C3AED]/20">
                        <HiOutlineGlobeAlt className="w-5 h-5 text-[#7C3AED] mb-3" />
                        <p className="text-sm font-black text-white">142</p>
                        <p className="text-[8px] font-black uppercase text-[#7C3AED]">Global Regions</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
                    <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-12 -right-12 p-6 glass-card !bg-[#0F172A]/80 rounded-3xl border border-white/10 shadow-3xl z-20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#14B8A6] rounded-xl flex items-center justify-center text-white">
                      <HiOutlineShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">Verified Peer</p>
                      <p className="text-[8px] font-black text-[#14B8A6] uppercase tracking-widest">Protocol Secured</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-12 -left-12 p-6 glass-card !bg-[#7C3AED] rounded-3xl border border-white/20 shadow-3xl z-20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                      <HiOutlineCpuChip className="w-6 h-6" />
                    </div>
                    <div className="text-white">
                      <p className="text-xs font-black">Neural Link</p>
                      <p className="text-[8px] font-black text-white/60 uppercase tracking-widest">Processing Node</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 border-b border-gray-100 bg-[#F8FAFC]">
        <Container>
          <p className="text-xs font-black text-[#64748B] uppercase tracking-[0.3em] mb-12 text-center opacity-70">Empowering projects for global leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 md:h-7" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-6 md:h-7" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6 md:h-7" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-6 md:h-7" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" alt="Slack" className="h-6 md:h-7" />
          </div>
        </Container>
      </section>

      {/* Best Workers Section */}
      <section className="py-32 bg-white relative">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-[#14B8A6] font-black uppercase tracking-widest text-sm mb-4 block">Platform Excellence</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#0F172A] mb-6 tracking-tighter">Elite <span className="text-[#7C3AED]">Earners</span> Gallery</h2>
            <p className="text-xl text-[#64748B] max-w-2xl mx-auto font-medium">Celebrating the masters of the micro-tasking ecosystem.</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-14 h-14 border-4 border-purple-100 border-t-[#7C3AED] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {topWorkers.map((worker, index) => (
                <motion.div
                  key={worker._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative bg-[#F8FAFC] rounded-[3rem] p-10 hover:bg-white hover:shadow-2xl hover:shadow-purple-100 transition-all duration-700 border border-transparent hover:border-purple-50"
                >
                  <div className="relative mb-8 mx-auto w-36 h-36">
                    <div className="absolute inset-0 bg-[#7C3AED] rounded-[2.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-701 opacity-5"></div>
                    <img
                      src={worker.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}`}
                      alt={worker.name}
                      className="w-full h-full rounded-[2.5rem] object-cover relative z-10 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute -bottom-3 -right-3 bg-[#F97316] text-white p-3 rounded-2xl shadow-lg z-20 animate-float translate-y-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-[#0F172A] mb-1 group-hover:text-[#7C3AED] transition-colors tracking-tight">{worker.name}</h3>
                  <p className="text-[#64748B] font-bold text-xs uppercase tracking-widest mb-8">Verified Expert</p>
                  <div className="inline-flex items-center gap-2 px-8 py-3 bg-white rounded-2xl border border-purple-50 group-hover:border-[#7C3AED]/20 transition-all shadow-sm">
                    <span className="text-[#7C3AED] font-black text-2xl tracking-tighter">{worker.coin.toLocaleString()}</span>
                    <span className="text-[#64748B] text-[10px] font-black uppercase tracking-wider">Coins</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Why Choose Section */}
      <section className="py-32 bg-[#0F172A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-60 bg-[#7C3AED] rounded-full blur-[200px] opacity-10 -mr-40 -mt-40 animate-pulse-soft"></div>
        <Container>
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[#14B8A6] font-black uppercase tracking-[0.3em] text-xs mb-6 block"
              >
                Premium Infrastructure
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-black mb-12 leading-[1.05] tracking-tighter">Built for <span className="text-[#7C3AED]">Security</span>, Scaled for Growth.</h2>
              <div className="space-y-10">
                {[
                  { t: "Node-Link Verification", d: "Our proprietary validation engine verifies every human-task interaction in milliseconds.", i: "🔗" },
                  { t: "Global Settlement", d: "Instant coin-to-currency settlements powered by Stripe enterprise.", i: "💳" },
                  { t: "Distributed Talent", d: "Access a verified workforce of 50,000+ professionals globally.", i: "🌏" }
                ].map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    key={idx} className="flex gap-8 group"
                  >
                    <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-3xl flex-shrink-0 border border-white/10 group-hover:bg-[#7C3AED] transition-all duration-500 transform group-hover:-rotate-6">{item.i}</div>
                    <div>
                      <h4 className="text-2xl font-black mb-2 tracking-tight">{item.t}</h4>
                      <p className="text-[#94A3B8] leading-relaxed font-medium text-lg">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1 }}
                className="bg-gradient-to-br from-[#7C3AED] to-[#14B8A6] rounded-[4rem] p-1 shadow-[0_0_80px_rgba(124,102,237,0.2)]"
              >
                <div className="bg-[#0F172A] rounded-[3.9rem] p-10 md:p-16 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8A6] blur-[100px] opacity-10"></div>
                  <div className="flex justify-between items-center mb-16">
                    <div className="text-4xl font-black tracking-tighter">Velocity</div>
                    <div className="px-6 py-2 bg-[#14B8A6]/10 text-[#14B8A6] rounded-full text-sm font-black tracking-widest border border-[#14B8A6]/20">+142.8%</div>
                  </div>
                  <div className="space-y-8">
                    {[90, 65, 100, 75, 95].map((h, i) => (
                      <div key={i} className="w-full bg-white/5 rounded-2xl h-10 overflow-hidden relative border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${h}%` }}
                          transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                          className={`h-full bg-gradient-to-r ${i % 2 === 0 ? 'from-[#7C3AED] to-[#A78BFA]' : 'from-[#14B8A6] to-[#5EEAD4]'} rounded-2xl shadow-[0_0_20px_rgba(124,102,237,0.3)]`}
                        ></motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <Container className="max-w-4xl">
          <div className="text-center mb-24">
            <span className="text-[#F97316] font-black uppercase tracking-widest text-sm mb-4 block">Support Center</span>
            <h2 className="text-5xl md:text-7xl font-black text-[#0F172A] mb-6 tracking-tighter">Insights & <span className="text-[#14B8A6]">Answers</span></h2>
            <p className="text-xl text-[#64748B] font-medium">Technical documentation for the global earner.</p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#F8FAFC] rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all hover:shadow-xl hover:shadow-purple-50 group"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left transition-all"
                >
                  <span className="text-xl font-black text-[#0F172A] group-hover:text-[#7C3AED] transition-colors tracking-tight">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${activeFaq === idx ? 'bg-[#7C3AED] text-white rotate-180' : 'bg-white text-[#7C3AED] border border-purple-50'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="px-8 pb-8"
                    >
                      <p className="text-[#64748B] text-lg leading-relaxed pt-4 border-t border-gray-200/40 font-medium">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#7C3AED] rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 shadow-3xl shadow-purple-200 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
            <div className="max-w-2xl text-center lg:text-left relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">Master the <span className="text-[#14B8A6]">Digital</span> Economy.</h2>
              <p className="text-xl text-purple-100/70 font-medium">Join 15,000+ top performers receiving premium task alerts.</p>
            </div>
            <form className="w-full max-w-lg flex flex-col md:flex-row gap-4 relative z-10">
              <input
                type="email"
                placeholder="institutional@email.com"
                className="flex-1 px-8 py-5 bg-white rounded-3xl outline-none focus:ring-4 focus:ring-purple-200 transition-all font-bold text-[#0F172A] shadow-inner"
              />
              <button className="btn-secondary text-lg px-10 shadow-xl shadow-teal-500/20">
                Join Network
              </button>
            </form>
          </motion.div>
        </Container>
      </section>

      {/* Final CTA Footer */}
      <section className="py-32 bg-white">
        <Container>
          <div className="bg-[#F8FAFC] rounded-[5rem] py-28 px-10 text-center relative overflow-hidden border border-purple-50 group">
            <div className="absolute top-0 left-0 -ml-24 -mt-24 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-[120px] group-hover:bg-[#7C3AED]/10 transition-colors duration-1000"></div>
            <div className="relative z-10">
              <span className="text-[#F97316] font-black uppercase tracking-[0.4em] text-xs mb-8 block">Next Generation Micro-Tasking</span>
              <h2 className="text-6xl md:text-8xl font-black text-[#0F172A] mb-10 tracking-tighter leading-tight">Ready to <span className="text-[#7C3AED]">Protocol?</span></h2>
              <p className="text-2xl text-[#64748B] mb-16 max-w-3xl mx-auto font-medium leading-relaxed">Join the most advanced earning network. Low latency. High security. Instant liquidity.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/register" className="btn-primary text-xl px-16 py-6 shadow-2xl shadow-purple-500/30">
                  Create Your Node
                </Link>
                <Link to="/contact" className="px-16 py-6 bg-white text-[#0F172A] rounded-2xl font-black text-xl hover:bg-[#F8FAFC] transition-all border border-gray-200 hover:border-[#7C3AED]/20 hover:shadow-lg">
                  Talk to Protocol
                </Link>
              </div>
              <div className="mt-16 flex flex-wrap justify-center items-center gap-12 text-[#94A3B8] font-black uppercase tracking-widest text-[10px]">
                <span className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#14B8A6] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  No Collateral
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#14B8A6] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  Instant Withdraw
                </span>
                <span className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#14B8A6] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  Global Access
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
