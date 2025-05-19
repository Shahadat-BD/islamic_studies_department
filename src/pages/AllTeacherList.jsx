import { useEffect, useState } from 'react';
import axios from 'axios';

const AllTeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    const res = await axios.get('http://localhost:5000/api/teachers');
    setTeachers(res.data);
  };


  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
  <div className="max-w-6xl mx-auto px-4 pb-8 pt-24 font-english">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
    All Teachers
  </h2>

  {teachers.length === 0 ? (
    <p className="text-center text-gray-500">No teachers found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.map((teacher) => (
        <div
          key={teacher._id}
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col sm:flex-row items-center gap-4"
        >
          <img
            src={teacher.image}
            alt={teacher.name}
            className="w-28 h-28 object-cover rounded-full  border border-gray-300"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold">{teacher.name}</h3>
            <p className="text-green-500 font-medium text-sm">{teacher.designation}</p>
            <p className="text-gray-500 text-sm mt-1">
              📧 {teacher.email}<br />
              📞 {teacher.phone}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              🏫 Department: {teacher.department}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
 </div>

  );
};

export default AllTeacherList;