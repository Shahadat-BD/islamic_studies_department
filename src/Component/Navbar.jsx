// src/components/Navbar.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Islamic Dept</Link>
      </div>
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/" className="hover:text-yellow-400">Home</Link>
        </li>
        <li>
          <Link to="/add-teacher" className="hover:text-yellow-400">Add Teacher</Link>
        </li>
        <li>
          <Link to="/add-routine" className="hover:text-yellow-400">Add Routine</Link>
        </li>
        <li>
          <Link to="/teachers" className="hover:text-yellow-400">Teachers</Link>
        </li>
        <li>
          <Link to="/routines" className="hover:text-yellow-400">Routines</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
            </li>
            <li className="text-sm">
              {user.email}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-yellow-400">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-400">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
