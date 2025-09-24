import ClientNavBar from "../components/ClientNavBar";
import { CreditCard, Wallet, Smartphone, CheckCircle, Info, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { paymentMethodsAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { defaultPaymentMethod, updateDefaultPaymentMethod } = useAuth();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      console.log('Fetching payment methods for client...');
      const data = await paymentMethodsAPI.getAll();
      console.log('API response:', data);
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        console.log('Data is array, setting payment methods:', data);
        setPaymentMethods(data);
      } else {
        console.error('API returned non-array data:', data);
        console.error('Data type:', typeof data);
        setPaymentMethods([]);
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      console.error('Error details:', error.message);
      setPaymentMethods([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('card') || lowerName.includes('credit')) {
      return <CreditCard size={24} className="text-blue-600" />;
    } else if (lowerName.includes('cash') || lowerName.includes('cash')) {
      return <Wallet size={24} className="text-green-600" />;
    } else if (lowerName.includes('mobile') || lowerName.includes('digital')) {
      return <Smartphone size={24} className="text-purple-600" />;
    }
    return <CreditCard size={24} className="text-gray-600" />;
  };

  const handleSetDefault = (paymentMethodId) => {
    updateDefaultPaymentMethod(paymentMethodId);
  };

  if (loading) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
        <ClientNavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading payment methods...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      <ClientNavBar />

            <div className="flex-1 pt-16 lg:pt-0 p-4 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#808080" }}>
            Available Payment Methods
          </h1>
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            <Info size={20} />
            <span className="text-sm font-medium">View Only - Admin manages methods</span>
          </div>
        </div>

        {/* Stats Card */}
        <div className="mb-8">
          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-green-600 font-semibold mb-4">
              <CheckCircle size={24} />
              Available Payment Methods
            </div>
            <p className="text-2xl font-bold">{Array.isArray(paymentMethods) ? paymentMethods.length : 0} methods configured</p>
          </div>
        </div>

        {/* Payment Methods Grid */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">Available Payment Methods</h2>
          
          {!Array.isArray(paymentMethods) || paymentMethods.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">No payment methods available</p>
              <p className="text-sm">Contact your administrator to configure payment methods</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(paymentMethods) && paymentMethods.map((method, index) => (
                <div key={method.menyra_pagesesID || index} className={`border rounded-2xl p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50 ${defaultPaymentMethod == method.menyra_pagesesID ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    {getPaymentMethodIcon(method.menyra_pageses || 'Default')}
                    <div className="flex items-center gap-2">
                      {defaultPaymentMethod == method.menyra_pagesesID && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star size={12} fill="currentColor" />
                          Default
                        </span>
                      )}
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Available
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {method.menyra_pageses || `Payment Method ${index + 1}`}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {method.pershkrimi || 'Standard payment method available for your orders'}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Ready to Use
                    </span>
                    <span className="text-xs text-gray-500">
                      ID: {method.menyra_pagesesID}
                    </span>
                  </div>
                  
                  {defaultPaymentMethod != method.menyra_pagesesID && (
                    <button
                      onClick={() => handleSetDefault(method.menyra_pagesesID)}
                      className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Star size={16} />
                      Set as Default
                    </button>
                  )}
                  
                  {defaultPaymentMethod == method.menyra_pagesesID && (
                    <div className="w-full px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                      <Star size={16} fill="currentColor" />
                      Default Payment Method
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}