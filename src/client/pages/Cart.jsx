import ClientNavBar from "../components/ClientNavBar"; 
import React from "react";

// Data statike për Cart
const currentCart = [
  { id: 1, name: "Product 1", quantity: 2, price: "$15.99" },
  { id: 2, name: "Product 3", quantity: 1, price: "$12.75" },
];

const previousOrders = [
  { id: 1, name: "Product 2", quantity: 1, price: "$25.50", date: "2025-09-01" },
  { id: 2, name: "Product 5", quantity: 3, price: "$19.99", date: "2025-08-28" },
];

export default function Cart() {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      {/* Sidebar */}
      <ClientNavBar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>
            Your Cart
          </h1>
        </div>

        {/* Your Current Cart */}
        <div className="bg-white shadow rounded-2xl p-6 mb-8">
          <h2 className="font-semibold mb-4" style={{ color: "#808080" }}>
            Your Current Cart
          </h2>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border-b">Product</th>
                <th className="text-left p-2 border-b">Quantity</th>
                <th className="text-left p-2 border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentCart.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b" style={{ color: "#808080" }}>{item.name}</td>
                  <td className="p-2 border-b" style={{ color: "#808080" }}>{item.quantity}</td>
                  <td className="p-2 border-b" style={{ color: "#808080" }}>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Your Previous Orders */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-4" style={{ color: "#808080" }}>
            Your Previous Orders
          </h2>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border-b">Product</th>
                <th className="text-left p-2 border-b">Quantity</th>
                <th className="text-left p-2 border-b">Price</th>
                <th className="text-left p-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {previousOrders.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b" style={{ color: "#808080" }}>{item.name}</td>
                  <td className="p-2 border-b" style={{ color: "#808080" }}>{item.quantity}</td>
                  <td className="p-2 border-b" style={{ color: "#808080" }}>{item.price}</td>
                  <td className="p-2 border-b" style={{ color: "#808080" }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
