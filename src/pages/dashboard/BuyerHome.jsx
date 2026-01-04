import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { motion } from 'framer-motion';
import { HiOutlineClipboardDocumentList, HiOutlineUserGroup, HiOutlineCreditCard, HiOutlineEllipsisHorizontal } from 'react-icons/hi2';

const BuyerHome = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    totalPayment: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tasksRes, statsRes] = await Promise.all([
          api.get('/tasks/buyer/my-tasks'),
          api.get('/submissions/buyer/stats').catch(() => ({ data: { totalPayment: 0 } }))
        ]);
        const tasks = tasksRes.data;

        const totalTasks = tasks.length;
        const pendingTasks = tasks.reduce((sum, task) => sum + task.required_workers, 0);
        const totalPayment = statsRes.data.totalPayment || 0;

        setStats({
          totalTasks,
          pendingTasks,
          totalPayment
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
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Buyer Dashboard</h1>
          <p className="text-[#64748B] text-sm font-medium mt-1">Manage your distributed processing tasks and workforce.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-[#7C3AED]/5 border border-[#7C3AED]/10 rounded-2xl">
          <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED]">Terminal Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Active Tasks', value: stats.totalTasks, icon: HiOutlineClipboardDocumentList, color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/5' },
          { label: 'Total Workforce', value: stats.pendingTasks, icon: HiOutlineUserGroup, color: 'text-[#F97316]', bg: 'bg-[#F97316]/5' },
          { label: 'Network Spend', value: `${stats.totalPayment} Coins`, icon: HiOutlineCreditCard, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/5' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-50 transition-all duration-500 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} rounded-full -mr-16 -mt-16 opacity-50 blur-3xl group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <HiOutlineEllipsisHorizontal className="text-gray-200" />
            </div>
            <div className="relative z-10">
              <h3 className="text-[#64748B] text-xs font-black uppercase tracking-widest mb-1">{item.label}</h3>
              <p className={`text-3xl font-black ${item.color} tracking-tight`}>{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyerHome;
