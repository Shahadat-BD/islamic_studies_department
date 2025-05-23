import { useContext, useState } from "react";
import {
  LayoutDashboard,
  UserPlus,
  CalendarPlus,
  ScrollText,
  Eye,
  CalendarDays,
  Users,
  GraduationCap,
  User,
  FileText,
  BookOpenCheck,
  ClipboardList,
  ArrowLeft,
  Menu,
  FileWarning,
  FileSearch,
} from "lucide-react";
import { AuthContext } from "../context/AuthProvider";
import { Link, NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="p-4">Loading...</div>;

  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition ${
      isActive ? "bg-blue-800 text-white" : "text-gray-200"
    }`;

  return (
    <div className="flex min-h-screen flex-col md:flex-row py-[90px] lg:px-10 bg-gray-50">
      {/* Top Bar for Mobile */}
      <div className="flex justify-between items-center p-4 bg-blue-900 text-white md:hidden">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white w-64 p-4 space-y-4 rounded-md md:block ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
    

        {
          user.email && (
          <>
         <div className="text-center border-b border-gray-50 pb-4">
           <img src={user.photoURL} className="w-24 h-24 rounded-full border-4 border-green-500 mx-auto" alt="" srcset="" />
             <h1 className="text-xl font-semibold">
              <span>{user.name}</span>
            </h1>
            <span className="text-sm text-white">{user?.email}</span>
         </div>
          </> )
        }

        {isTeacher && (
          <>
            <NavLink to="add-teacher" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <UserPlus size={18} /> Add Teacher
            </NavLink>
            <NavLink to="add-routine" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <CalendarPlus size={18} /> Add Routine
            </NavLink>
            <NavLink to="add-notice" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <ScrollText size={18} /> Add Notice
            </NavLink>
            <NavLink to="add-result-form" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <ClipboardList size={18} /> Add Result Form
            </NavLink>
            <NavLink to="teacher-notice-show" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <Eye size={18} /> Notice Show
            </NavLink>
            <NavLink to="routines" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <CalendarDays size={18} /> Routine List
            </NavLink>
            <NavLink to="teachers" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <Users size={18} /> Teacher Info
            </NavLink>
            <NavLink to="all-students" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <GraduationCap size={18} /> All Students Info
            </NavLink>
            <NavLink to="all-user" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <User size={18} /> All User Info
            </NavLink>
          </>
        )}

        {isStudent && (
          <>
            <NavLink to="add-academic-info" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <FileText size={18} /> Add Academic Info
            </NavLink>
            <NavLink to="my-academic-info" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <BookOpenCheck size={18} /> Show Academic Info
            </NavLink>
            <NavLink to="my-complaint" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <FileWarning size={18} /> Add Complaint
            </NavLink>
            <NavLink to="show-my-complaint" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <FileSearch size={18} />My Complaint
            </NavLink>
          </>
        )}

        <Link
          to="/"
          className="flex items-center gap-2 mt-6 px-4 py-2 rounded-md hover:bg-blue-800 text-sm transition"
          onClick={() => setSidebarOpen(false)}
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
