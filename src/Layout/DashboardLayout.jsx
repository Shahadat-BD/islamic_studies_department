import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu } from "lucide-react"; // hamburger icon

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  return (
    <div className="flex min-h-screen flex-col md:flex-row pt-[78px]">
      {/* Top Bar for Mobile */}
      <div className="flex justify-between items-center p-4 bg-blue-900 text-white md:hidden">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white w-64 p-4 space-y-4 md:block ${
          sidebarOpen ? "block" : "hidden"
        }  fixed md:static z-50`}
      >
        <h2 className="text-xl font-bold mb-6 hidden md:block">Dashboard</h2>

        {isTeacher && (
          <>
            <NavLink to="add-teacher" className="block" onClick={() => setSidebarOpen(false)}>➕ Add Teacher</NavLink>
            <NavLink to="add-routine" className="block" onClick={() => setSidebarOpen(false)}>➕ Add Routine</NavLink>
            <NavLink to="add-notice" className="block" onClick={() => setSidebarOpen(false)}>➕ Add Notice</NavLink>
            <NavLink to="add-result-form" className="block" onClick={() => setSidebarOpen(false)}>➕ Add Result Form</NavLink>
            <NavLink to="teacher-notice-show" className="block" onClick={() => setSidebarOpen(false)}>👁️ Notice Show</NavLink>
            <NavLink to="routines" className="block" onClick={() => setSidebarOpen(false)}>🗓️ Routine List</NavLink>
            <NavLink to="teachers" className="block" onClick={() => setSidebarOpen(false)}>👥 Teacher Info</NavLink>
            <NavLink to="all-students" className="block" onClick={() => setSidebarOpen(false)}>🎓 All Students Info</NavLink>
            <NavLink to="all-user" className="block" onClick={() => setSidebarOpen(false)}>👤 All User Info</NavLink>
          </>
        )}

        {isStudent && (
          <>
            <NavLink to="add-academic-info" className="block" onClick={() => setSidebarOpen(false)}>📄 Add Academic Info</NavLink>
            <NavLink to="my-academic-info" className="block" onClick={() => setSidebarOpen(false)}>📚 Show Academic Info</NavLink>
            <NavLink to="my-result" className="block" onClick={() => setSidebarOpen(false)}>📚 My Result</NavLink>
          </>
        )}

        <Link to="/" className="block mt-6" onClick={() => setSidebarOpen(false)}>⬅️ Back to Home</Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
