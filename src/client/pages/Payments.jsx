import ClientNavBar from "../components/ClientNavBar";
import { DollarSign, CreditCard, Banknote, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { paymentAPI, paymentMethodsAPI, ordersAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [paymentsData, paymentMethodsData, ordersData] = await Promise.all([
        paymentAPI.getAll(),
        paymentMethodsAPI.getAll(),
        ordersAPI.getAll()
      ]);
      
      // Filter orders and payments to show only current client's data
      const clientId = user?.klientiID || user?.id || user?.clientId || user?.userId || user?.klienti_id;
      
      const clientOrders = Array.isArray(ordersData) 
        ? ordersData.filter(order => order.klientiID == clientId)
        : [];
      
      // Filter payments to show only current client's payments
      const clientPayments = Array.isArray(paymentsData) 
        ? paymentsData.filter(payment => payment.klientiID == clientId)
        : [];
      
      setPayments(clientPayments);
      setPaymentMethods(Array.isArray(paymentMethodsData) ? paymentMethodsData : []);
      setOrders(clientOrders);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await paymentAPI.getAll();
      const clientId = user?.klientiID || user?.id || user?.clientId || user?.userId;
      
      // Filter payments to show only current client's payments
      const clientPayments = Array.isArray(data) 
        ? data.filter(payment => payment.klientiID == clientId)
        : [];
      
      setPayments(clientPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      alert('Error fetching payments. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
        <ClientNavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading payments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      <ClientNavBar />

      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#808080" }}>
            Payment History
          </h1>
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
            <Info size={20} />
            <span className="text-sm font-medium">Payments are created automatically with orders</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <DollarSign size={24} />
              Total Payments
            </div>
            <p className="text-2xl font-bold mt-2">{payments.length}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-blue-600 font-semibold">
              <CreditCard size={24} />
              Completed
            </div>
            <p className="text-2xl font-bold mt-2">
              {payments.filter(p => p.status === 'completed').length}
            </p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-yellow-600 font-semibold">
              <Banknote size={24} />
              Pending
            </div>
            <p className="text-2xl font-bold mt-2">
              {payments.filter(p => p.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          
          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <DollarSign size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">No payments found</p>
              <p className="text-sm">Payments will appear here automatically when you place orders.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Payment Method</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Account Number</th>
                    <th className="text-left py-3 px-4">Payment Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => {
                    const paymentMethod = paymentMethods.find(method => method.menyra_pagesesID === payment.menyra_pagesesID);
                    return (
                      <tr key={payment.pagesaID || index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{payment.pagesaID || index + 1}</td>
                        <td className="py-3 px-4">{payment.porosiaID || 'N/A'}</td>
                        <td className="py-3 px-4">{paymentMethod?.menyra_pageses || 'N/A'}</td>
                        <td className="py-3 px-4 font-semibold">${payment.shuma_pageses || '0.00'}</td>
                        <td className="py-3 px-4">{payment.numri_llogarise || 'N/A'}</td>
                        <td className="py-3 px-4">{payment.koha_pageses ? new Date(payment.koha_pageses).toLocaleDateString() : 'N/A'}</td>
                        <td className="py-3 px-4">
                          <span className="text-gray-400 text-sm">View Only</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}