import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

const Withdrawals = () => {
  const { userData } = useAuth();
  const [withdrawalCoin, setWithdrawalCoin] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState('Stripe');
  const [accountNumber, setAccountNumber] = useState('');
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await api.get('/withdrawals/worker/my-withdrawals');
        setWithdrawals(response.data);
      } catch (error) {
        console.error('Error fetching withdrawals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWithdrawals();
  }, []);

  useEffect(() => {
    if (withdrawalCoin) {
      const amount = parseFloat(withdrawalCoin) / 20;
      setWithdrawalAmount(amount.toFixed(2));
    } else {
      setWithdrawalAmount(0);
    }
  }, [withdrawalCoin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const coin = parseFloat(withdrawalCoin);
    if (coin < 200) {
      setError('Minimum withdrawal is 200 coins (10 dollars)');
      return;
    }

    if (coin > userData.coin) {
      setError('Insufficient coins');
      return;
    }

    if (!accountNumber.trim()) {
      setError('Account number is required');
      return;
    }

    setSubmitting(true);

    try {
      await api.post('/withdrawals', {
        withdrawal_coin: coin,
        payment_system: paymentSystem,
        account_number: accountNumber
      });
      setSuccess('Withdrawal request submitted successfully');
      setWithdrawalCoin('');
      setAccountNumber('');
      
      // Refresh withdrawals list
      const response = await api.get('/withdrawals/worker/my-withdrawals');
      setWithdrawals(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit withdrawal request');
    } finally {
      setSubmitting(false);
    }
  };

  const currentCoin = userData?.coin || 0;
  const totalWithdrawalAmount = currentCoin / 20;
  const canWithdraw = currentCoin >= 200;

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Withdrawals</h1>

      {/* User Total Earning */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Earnings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Current Coins</p>
            <p className="text-2xl font-bold text-indigo-600">{currentCoin} Coins</p>
          </div>
          <div>
            <p className="text-gray-600">Withdrawal Amount</p>
            <p className="text-2xl font-bold text-green-600">${totalWithdrawalAmount.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Note: 20 Coins = 1 Dollar. Minimum withdrawal is 200 coins (10 dollars).
        </p>
      </div>

      {/* Withdrawal Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Withdrawal Form</h2>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {!canWithdraw ? (
          <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Insufficient coin. You need at least 200 coins to withdraw.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="withdrawal_coin" className="block text-sm font-medium text-gray-700 mb-2">
                  Coin To Withdraw
                </label>
                <input
                  type="number"
                  id="withdrawal_coin"
                  value={withdrawalCoin}
                  onChange={(e) => setWithdrawalCoin(e.target.value)}
                  min="200"
                  max={currentCoin}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="withdrawal_amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Withdraw Amount ($)
                </label>
                <input
                  type="text"
                  id="withdrawal_amount"
                  value={withdrawalAmount}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="payment_system" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Payment System
                </label>
                <select
                  id="payment_system"
                  value={paymentSystem}
                  onChange={(e) => setPaymentSystem(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="Stripe">Stripe</option>
                  <option value="Bkash">Bkash</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="account_number" className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  id="account_number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Withdraw'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Withdrawal History */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Withdrawal History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount ($)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment System</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdrawals.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No withdrawal requests yet</td>
                </tr>
              ) : (
                withdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {withdrawal.withdrawal_coin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${withdrawal.withdrawal_amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {withdrawal.payment_system}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          withdrawal.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : withdrawal.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {withdrawal.status}
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

export default Withdrawals;

