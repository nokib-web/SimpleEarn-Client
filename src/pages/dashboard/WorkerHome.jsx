import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { motion } from 'framer-motion';
import { HiOutlineDocumentCheck, HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineChartBar } from 'react-icons/hi2';

const WorkerHome = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    totalEarning: 0
  });
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, approvedRes] = await Promise.all([
          api.get('/submissions/worker/stats'),
          api.get('/submissions/worker/approved')
        ]);
        setStats(statsRes.data);
        setApprovedSubmissions(approvedRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Worker Dashboard</h1>
          <p className="text-[#64748B] text-sm font-medium mt-1">Monitor your protocol contributions and earnings.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-[#7C3AED]/5 border border-[#7C3AED]/10 rounded-2xl">
          <div className="w-2 h-2 bg-[#14B8A6] rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED]">Node Active</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'Total Submissions', value: stats.totalSubmissions, icon: HiOutlineDocumentCheck, color: 'text-[#7C3AED]', bg: 'bg-[#7C3AED]/5' },
          { label: 'Pending Review', value: stats.pendingSubmissions, icon: HiOutlineClock, color: 'text-[#F97316]', bg: 'bg-[#F97316]/5' },
          { label: 'Total Earnings', value: `${stats.totalEarning} Coins`, icon: HiOutlineCurrencyDollar, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/5' }
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
              <HiOutlineChartBar className="text-gray-200" />
            </div>
            <div className="relative z-10">
              <h3 className="text-[#64748B] text-xs font-black uppercase tracking-widest mb-1">{item.label}</h3>
              <p className={`text-3xl font-black ${item.color} tracking-tight`}>{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Approved Submissions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h2 className="text-lg font-black text-[#0F172A] tracking-tight">Recent Approvals</h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED] bg-[#7C3AED]/10 px-3 py-1 rounded-full">Automated Settlement</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-50">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-left text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Protocol Task</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Volume</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Origin</th>
                <th className="px-8 py-4 text-left text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {approvedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center text-gray-400 font-medium">No verified contributions found in current epoch</td>
                </tr>
              ) : (
                approvedSubmissions.map((submission) => (
                  <tr key={submission._id} className="group hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <p className="text-sm font-black text-[#0F172A] leading-none mb-1 group-hover:text-[#7C3AED] transition-colors">{submission.task_title}</p>
                      <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">ID: {submission._id.slice(-8)}</p>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-[#14B8A6]">{submission.payable_amount}</span>
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Coins</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <p className="text-sm font-bold text-[#64748B]">{submission.buyer_name}</p>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20">
                        {submission.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkerHome;
