import { useEffect, useState } from 'react';
import api from '../../utils/api';

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Pending Tasks</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingTasks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Payment Paid</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalPayment} Coins</p>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
