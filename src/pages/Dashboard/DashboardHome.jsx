import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { user , logout } = useContext(AuthContext);
  
   const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out");
    } catch (err) {
      console.error(err.message);
    }
  };
  const isStudent = user?.role === "student";
  const isTeacher = user?.role === "teacher";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Top Profile Section */}
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
            alt="profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome,{" "}
              <span className="text-green-600">{user?.name || "User"}</span>
            </h1>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-xs text-gray-400 capitalize">
              Role: {user?.role}
            </p>
          </div>
        </div>

        {/* Role-based Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          {/* Common for All */}
          <div className="p-6 border rounded-lg bg-green-50">
            <h3 className="font-bold text-lg mb-2">Your Profile</h3>
            <p className="text-sm text-gray-600">
              View and update your personal information.
            </p>
            <button className="mt-3 text-sm text-green-600 underline">
              View Profile
            </button>
          </div>

          {/* Student-specific blocks */}
          {isStudent && (
            <>
              <div className="p-6 border rounded-lg bg-blue-50">
                <h3 className="font-bold text-lg mb-2">My Routine</h3>
                <p className="text-sm text-gray-600">
                  Check your academic class schedule anytime.
                </p>
                <Link to={'/all-routine-list'} className="mt-3 text-sm text-blue-600 underline">
                   View Routine
                </Link>
              </div>

              <div className="p-6 border rounded-lg bg-yellow-50">
                <h3 className="font-bold text-lg mb-2">Add Academic Info</h3>
                <p className="text-sm text-gray-600">
                  Submit or update your academic records.
                </p>
                <Link to={"/dashboard/add-academic-info"} className="mt-3 text-sm text-yellow-600 underline">
                  Add Academic Info
                </Link>
              </div>
            </>
          )}

          {/* Teacher-specific blocks */}
          {isTeacher && (
            <>
              <div className="p-6 border rounded-lg bg-purple-50">
                <h3 className="font-bold text-lg mb-2">Manage Notices</h3>
                <p className="text-sm text-gray-600">
                  View and manage academic notices.
                </p>
                <Link to={'/dashboard/teacher-notice-show'} className="mt-3 text-sm text-purple-600 underline">
                  View Notice
                </Link>
              </div>

              <div className="p-6 border rounded-lg bg-indigo-50">
                <h3 className="font-bold text-lg mb-2">Manage Routine</h3>
                <p className="text-sm text-gray-600">
                  Create or update academic schedules.
                </p>
                <Link to={'/dashboard/routines'} className="mt-3 text-sm text-indigo-600 underline">
                  Manage Routine
                </Link>
              </div>
            </>
          )}

          {/* Logout - Common */}
          <div className="p-6 border rounded-lg bg-red-50">
            <h3 className="font-bold text-lg mb-2">Logout</h3>
            <p className="text-sm text-gray-600">
              Securely logout from your account.
            </p>
            <button onClick={handleLogout} className="mt-3 text-sm text-red-600 underline">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
