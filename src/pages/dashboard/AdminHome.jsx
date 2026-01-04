import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { motion } from 'framer-motion';
import { HiOutlineUsers, HiOutlineUserGroup, HiOutlineCurrencyDollar, HiOutlineArrowPath, HiOutlineChartBar } from 'react-icons/hi2';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalCoins: 0,
    totalPayments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, paymentsRes] = await Promise.all([
          api.get('/users'),
          api.get('/payments/history')
        ]);

        const users = usersRes.data;
        const payments = paymentsRes.data;

        const totalWorkers = users.filter(u => u.role === 'worker').length;
        const totalBuyers = users.filter(u => u.role === 'buyer').length;
        const totalCoins = users.reduce((sum, user) => sum + user.coin, 0);
        const totalPayments = payments.length;

        setStats({
          totalWorkers,
          totalBuyers,
          totalCoins,
          totalPayments
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Admin Dashboard</h1>
          <p className="text-[#64748B] text-sm font-medium mt-1">Global protocol oversight and asset distribution control.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-[#F97316]/5 border border-[#F97316]/10 rounded-2xl">
          <div className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#F97316]">Protocol Authority</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Workers', value: stats.totalWorkers, icon: HiOutlineUsers, color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/5' },
          { label: 'Total Buyers', value: stats.totalBuyers, icon: HiOutlineUserGroup, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/5' },
          { label: 'Global Liquidity', value: stats.totalCoins, icon: HiOutlineCurrencyDollar, color: 'text-[#F97316]', bg: 'bg-[#F97316]/5' },
          { label: 'Settlements', value: stats.totalPayments, icon: HiOutlineArrowPath, color: 'text-[#6366F1]', bg: 'bg-[#6366F1]/5' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-50 transition-all duration-500 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} rounded-full -mr-12 -mt-12 opacity-50 blur-2xl group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <HiOutlineChartBar className="text-gray-100" />
            </div>
            <div className="relative z-10">
              <h3 className="text-[#64748B] text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</h3>
              <p className={`text-2xl font-black ${item.color} tracking-tight`}>{item.value.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminHome;
