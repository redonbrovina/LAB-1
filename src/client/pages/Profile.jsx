import ClientNavBar from "../components/ClientNavBar";
import { useEffect, useState } from "react";

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+383 45 000 000"
  });

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      <ClientNavBar />

      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#808080" }}>
          Profile
        </h1>

        <div className="bg-white shadow rounded-2xl p-6 max-w-md">
          <h2 className="font-semibold mb-4" style={{ color: "#808080" }}>
            User Information
          </h2>
          <p style={{ color: "#808080" }}>
            <strong>Name:</strong> {userData.name}
          </p>
          <p style={{ color: "#808080" }}>
            <strong>Email:</strong> {userData.email}
          </p>
          <p style={{ color: "#808080" }}>
            <strong>Phone:</strong> {userData.phone}
          </p>
        </div>
      </div>
    </div>
  );
}