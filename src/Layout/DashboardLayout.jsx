// src/layouts/DashboardLayout.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        {isTeacher && (
          <>
            <NavLink to="add-teacher" className="block">➕ Add Teacher</NavLink>
            <NavLink to="teachers" className="block">👥 Teacher List</NavLink>
            <NavLink to="add-routine" className="block">➕ Add Routine</NavLink>
            <NavLink to="routines" className="block">🗓️ Routine List</NavLink>
            <NavLink to="all-students" className="block">🎓 All Students Info</NavLink>
            <NavLink to="all-users" className="block">👤 All User Info</NavLink>
          </>
        )}

        {isStudent && (
          <>
            <NavLink to="add-academic-info" className="block">📄 Add Academic Info</NavLink>
            <NavLink to="my-academic-info" className="block">📚 Show your Academic Info</NavLink>
          </>
        )}

        <Link to="/" className="block mt-6">⬅️ Back to Home</Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
