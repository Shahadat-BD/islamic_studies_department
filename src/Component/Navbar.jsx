// src/components/Navbar.jsx
import { useContext } from "react";
import { Link , NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import logo from "../assets/islamicStudieslogo.png";


const Navbar = () => {

 const {user, logout} = useContext(AuthContext)
  
   const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out");
    } catch (err) {
      console.error(err.message);
    }
  };

  const link = <>

    <li className='pr-10' ><NavLink className="px-0 rounded-none font-bold text-md"
      style={({ isActive }) => ({
        color: isActive ? "#1E40AF" : "black",
        borderBottom: isActive ? "2px solid #1E40AF" : "none",
        background: isActive ? "none" : "none",
      })} to={'/'}>Home</NavLink></li>

    <li className='pr-10'><NavLink className="px-0 rounded-none font-bold text-md"
      style={({ isActive }) => ({
        color: isActive ? "#1E40AF" : "black",
        borderBottom: isActive ? "2px solid #1E40AF" : "none",
        background: isActive ? "none" : "none",
      })} to={'/all-teacher-list'}>Teacher List</NavLink></li>

    <li className='pr-10'>
     <NavLink className="px-0 rounded-none font-bold text-md"
      style={({ isActive }) => ({
        color: isActive ? "#1E40AF" : "black",
        borderBottom: isActive ? "2px solid #1E40AF" : "none",
        background: isActive ? "none" : "none",
      })} to={'/all-routine-list'}>Routine List</NavLink></li>

    <li className='pr-10'>
     <NavLink className="px-0 rounded-none font-bold text-md"
      style={({ isActive }) => ({
        color: isActive ? "#1E40AF" : "black",
        borderBottom: isActive ? "2px solid #1E40AF" : "none",
        background: isActive ? "none" : "none",
      })} to={'/my-result'}>Result Check</NavLink></li>

    <li className='pr-10'>
     <NavLink className="px-0 rounded-none font-bold text-md"
      style={({ isActive }) => ({
        color: isActive ? "#1E40AF" : "black",
        borderBottom: isActive ? "2px solid #1E40AF" : "none",
        background: isActive ? "none" : "none",
      })} to={'/show-notice'}>Notice list </NavLink></li>

      
    </>



  return (
    <div>
      <div className="navbar fixed top-0 left-0 w-full bg-white shadow z-50  bg-base-100  m-auto border-b-2 font-english">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {link}
            </ul>
          </div>
          <Link to={'/'}>
            <div className='flex items-center'>
              <img className='h-[60px]' src={logo} alt="" srcset="" />
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {link}
          </ul>
        </div>
        <div className="navbar-end">
           {
             user ?
             ''
              : 
              <Link to={'/login'}>
                <button className='px-5 py-2 rounded-md text-white bg-blue-900 font-bold text-md'>login</button>
             </Link>

            }
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="">
              {
              user?.email
                ? 
                <img className="w-12 h-12 border-2  rounded-full mr-2" src={user.photoURL} alt="" />
                : ''
              }
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu  shadow text-black bg-base-100 rounded-box w-52">
              <li><p className=''>{user && user.name}</p></li>
              <li><Link to={'/dashboard'}>Dashboard</Link></li>
              <li><button className='' onClick={handleLogout}>Log Out</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
