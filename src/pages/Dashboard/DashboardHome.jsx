import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
            alt="profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome, <span className="text-green-600">{user?.name|| "User"}</span>
            </h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Quick Stats / Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 border rounded-lg bg-green-50">
            <h3 className="font-bold text-lg mb-2">Your Profile</h3>
            <p className="text-sm text-gray-600">
              View and update your personal information.
            </p>
            <button className="mt-3 text-sm text-green-600 underline">
              View Profile
            </button>
          </div>

          <div className="p-6 border rounded-lg bg-blue-50">
            <h3 className="font-bold text-lg mb-2">My Routine</h3>
            <p className="text-sm text-gray-600">
              Check your academic class schedule anytime.
            </p>
            <button className="mt-3 text-sm text-blue-600 underline">
              View Routine
            </button>
          </div>

          <div className="p-6 border rounded-lg bg-yellow-50">
            <h3 className="font-bold text-lg mb-2">Add Academic Info</h3>
            <p className="text-sm text-gray-600">
              Submit or update your academic records.
            </p>
            <button className="mt-3 text-sm text-yellow-600 underline">
              Add Info
            </button>
          </div>

          <div className="p-6 border rounded-lg bg-red-50">
            <h3 className="font-bold text-lg mb-2">Logout</h3>
            <p className="text-sm text-gray-600">
              Securely logout from your account.
            </p>
            <button className="mt-3 text-sm text-red-600 underline">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
