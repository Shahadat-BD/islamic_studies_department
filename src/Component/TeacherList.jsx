import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { Users } from 'lucide-react';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const { user , getToken } = useContext(AuthContext);
  
  const fetchTeachers = async () => {
    if (!user) return;

    try {
      if (user.role === 'teacher') {
        // 🔐 Only fetch the logged-in teacher's info
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teachers/me/${user.email}`);
        setTeachers([res.data]); // set as array for consistency
      } else {
        // 🔓 Admin, student, etc. can see all teachers
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teachers`);
        setTeachers(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch teachers:', err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      const token = await getToken()
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/teachers/${id}`,
        {
          headers :{
                   Authorization: `Bearer ${token}`
          }
        }
      );
      fetchTeachers();
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 font-english">
  <h2 className="text-2xl font-bold text-blue-900 mb-14 flex items-center gap-3 border-b border-blue-600 pb-2">
    <Users size={25} />  Teacher Information
  </h2>

  <div className="grid gap-6">
    {teachers.map((teacher) => (
      <div
        key={teacher._id}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-200 text-center relative"
      >
        {/* Teacher Image */}
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-gray-200 -mt-16 mb-4 shadow"
        />

        {/* Teacher Info */}
        <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
        <p className="text-gray-600 mb-1">{teacher.designation}</p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Email:</span> {teacher.email}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Phone:</span> {teacher.phone}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-medium">Department:</span> {teacher.department}
        </p>

        {/* Buttons */}
        {user?.role === 'teacher' && (
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to={`/dashboard/edit-teacher/${teacher._id}`}
              className="bg-green-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-green-600 transition"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(teacher._id)}
              className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ))}

    {teachers.length === 0 && (
      <span className="text-red-500 font-semibold text-center">
        Please add your information in the <strong>"Add Teacher"</strong> form.
      </span>
    )}
  </div>
</div>

  );
};

export default TeacherList;
