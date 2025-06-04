import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "lucide-react";
import { AuthContext } from "../context/AuthProvider";

const AllUserInfo = () => {
  const [users, setUsers] = useState([]);
  const {getToken} = useContext(AuthContext)
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // ✅ Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(res.data);
      console.log(res.data);

    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };


  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  // ✅ Handle role update
  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingId(userId); // Optional: for showing loading spinner
    
      const token = await getToken();
      await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}/role`, { 
        role: newRole,
      },
      {
        headers : {
           Authorization: `Bearer ${token}`, // ✅ Token attach করা হলো
          'Content-Type': 'application/json'
        }
      }
    
    );
      await fetchUsers(); // refresh user list after update
    } catch (error) {
      console.error("Failed to update role", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="font-english bg-white rounded shadow-md">
 
  <div className='bg-blue-900 text-white rounded-t-xl py-3'>
     <h2 className="text-2xl font-bold pl-5  flex items-center gap-4">
       <User size={25} /> All User Info
     </h2>
 </div>

  {/* 🔍 Search Box */}
  <div className="m-4">
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
    />
  </div>

  <div className="overflow-x-auto p-4 ">
    <table className="min-w-full table-auto border border-gray-200 text-left shadow-sm rounded">
      <thead className="bg-blue-100 text-gray-700">
        <tr>
          <th className="p-2 border border-gray-200">#</th>
          <th className="p-2 border border-gray-200">Photo</th>
          <th className="p-2 border border-gray-200">Name</th>
          <th className="p-2 border border-gray-200">Role</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user, index) => (
          <tr key={user._id} className="hover:bg-blue-50 transition-all">
            <td className="p-2 border border-gray-200">{indexOfFirstUser + index + 1}</td>
            <td className="p-2 border border-gray-200">
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover shadow"
              />
            </td>
            <td className="p-2 border border-gray-200 font-medium text-gray-800">{user.name}</td>
            <td className="p-2 border border-gray-200">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded focus:ring-1 focus:ring-blue-500"
                disabled={updatingId === user._id}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Pagination Buttons */}
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600"
      >
        Previous
      </button>

      <span className="text-lg font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600"
      >
        Next
      </button>
    </div>

    {filteredUsers.length === 0 && (
      <p className="text-center text-gray-500 mt-6 italic">No users found</p>
    )}
  </div>
   </div>

  );
};

export default AllUserInfo;
