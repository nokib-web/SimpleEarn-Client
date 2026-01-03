import { useEffect, useState } from 'react';
import api from '../../utils/api';

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Workers</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalWorkers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Buyers</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalBuyers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Available Coins</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalCoins}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Payments</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalPayments}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
