import ClientNavBar from "../components/ClientNavBar";
import { ShoppingCart, DollarSign } from "lucide-react"; // DollarSign mundet me u heqë nëse nuk e përdorim
import React from "react";

// Array statik me produkte
const productsList = [
  { id: 1, name: "Product 1", price: "$15.99", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product 2", price: "$25.50", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product 3", price: "$12.75", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Product 4", price: "$8.99", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Product 5", price: "$19.99", image: "https://via.placeholder.com/150" },
];

export default function Products() {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      {/* Sidebar */}
      <ClientNavBar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>Shop</h1>
            <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="bell">🔔</span>
            </button>
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="user">👤</span>
            </button>
          </div>
        </div>

        {/* Grid me produktet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsList.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4 rounded-lg" />
              <h2 className="font-semibold text-gray-700">{product.name}</h2>
              <p className="text-green-600 font-bold">{product.price}</p>
              <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2">
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
