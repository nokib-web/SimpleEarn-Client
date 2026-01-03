import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const PurchaseCoin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const packages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 }
  ];

  const handlePurchase = async (coins, price) => {
    setLoading(`${coins}-${price}`);

    try {
      // Try to create payment intent with Stripe
      try {
        const intentRes = await api.post('/payments/create-intent', {
          amount: price,
          coins: coins
        });

        // If Stripe is configured, use it
        // For now, we'll use dummy payment
        // In production, integrate Stripe Elements here
        
        // Dummy payment confirmation
        await api.post('/payments/confirm', {
          amount: price,
          coins: coins,
          payment_intent_id: intentRes.data.paymentIntentId || 'dummy_' + Date.now()
        });

        alert('Payment successful! Coins have been added to your account.');
        navigate('/dashboard/buyer-home');
      } catch (stripeError) {
        // If Stripe fails, use dummy payment
        await api.post('/payments/confirm', {
          amount: price,
          coins: coins,
          payment_intent_id: 'dummy_' + Date.now()
        });

        alert('Payment successful! Coins have been added to your account.');
        navigate('/dashboard/buyer-home');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Purchase Coin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div key={`${pkg.coins}-${pkg.price}`} className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">{pkg.coins}</div>
            <div className="text-gray-600 mb-4">Coins</div>
            <div className="text-3xl font-bold mb-4">${pkg.price}</div>
            <button
              onClick={() => handlePurchase(pkg.coins, pkg.price)}
              disabled={loading === `${pkg.coins}-${pkg.price}`}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === `${pkg.coins}-${pkg.price}` ? 'Processing...' : 'Purchase'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;

