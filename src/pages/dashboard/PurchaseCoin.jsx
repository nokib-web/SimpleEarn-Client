import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import api from '../../utils/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SVPJoEXD9fYhlupc0wO83f2');

const PurchaseCoin = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const packages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 }
  ];

  useEffect(() => {
    if (selectedPackage) {
      // Clear previous secret
      setClientSecret("");

      // Fetch new one
      api.post("/payments/create-intent", {
        amount: selectedPackage.price,
        coins: selectedPackage.coins
      })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating intent:", err);
        });
    }
  }, [selectedPackage]);

  const handleSuccess = () => {
    alert('Payment successful! Your coin balance has been updated.');
    navigate('/dashboard/buyer-home');
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#6366f1',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#df1b41',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Purchase Coins</h1>

        {!selectedPackage ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div
                key={`${pkg.coins}-${pkg.price}`}
                onClick={() => setSelectedPackage(pkg)}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 text-center cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-indigo-50 rounded-full p-2">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>

                <div className="text-5xl font-black text-indigo-600 mb-2 drop-shadow-sm">{pkg.coins}</div>
                <div className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-6">Coins</div>

                <div className="text-3xl font-bold text-gray-800 mb-6">${pkg.price}</div>

                <button className="w-full py-3 px-6 rounded-xl bg-gray-50 text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  Select
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Order Summary */}
            <div className="w-full lg:w-1/3 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                  <button onClick={() => setSelectedPackage(null)} className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold">Change</button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Coin Package</span>
                    <span className="font-medium text-gray-900">{selectedPackage.coins} Coins</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Price</span>
                    <span className="font-medium text-gray-900">${selectedPackage.price}.00</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between items-center text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${selectedPackage.price}.00</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 p-4 bg-green-50 rounded-xl text-green-700 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant processing. Coins will be added immediately after payment.</span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="w-full lg:w-2/3 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                {clientSecret ? (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                      coins={selectedPackage.coins}
                      price={selectedPackage.price}
                      onSuccess={handleSuccess}
                    />
                  </Elements>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-medium">Initializing secure checkout...</p>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t flex flex-wrap justify-center gap-6 opacity-40">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseCoin;
