import { useEffect, useState } from 'react';
import api from '../../utils/api';

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Worker Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Submissions</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalSubmissions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Pending Submissions</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingSubmissions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Earning</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalEarning} Coins</p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Approved Submissions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payable Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {approvedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No approved submissions yet</td>
                </tr>
              ) : (
                approvedSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.task_title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.payable_amount} Coins
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.buyer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {submission.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
