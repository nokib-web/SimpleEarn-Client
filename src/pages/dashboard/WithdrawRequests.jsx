import { useEffect, useState } from 'react';
import api from '../../utils/api';

const WithdrawRequests = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const response = await api.get('/withdrawals/pending');
      setWithdrawals(response.data);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (withdrawalId) => {
    if (!window.confirm('Are you sure you want to approve this withdrawal request?')) {
      return;
    }

    try {
      await api.patch(`/withdrawals/${withdrawalId}/approve`);
      fetchWithdrawals();
    } catch (error) {
      console.error('Error approving withdrawal:', error);
      alert('Failed to approve withdrawal');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Withdraw Requests</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Withdrawal Coin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Withdrawal Amount ($)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment System</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdrawals.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No pending withdrawal requests</td>
                </tr>
              ) : (
                withdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{withdrawal.worker_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{withdrawal.withdrawal_coin}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">${withdrawal.withdrawal_amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{withdrawal.payment_system}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{withdrawal.account_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleApprove(withdrawal._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Payment Success
                      </button>
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

export default WithdrawRequests;

