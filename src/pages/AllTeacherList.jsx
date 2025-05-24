import { useEffect, useState } from 'react';
import axios from 'axios';

const AllTeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    const res = await axios.get('https://islamic-studies-backend.onrender.com/api/teachers');
    setTeachers(res.data);
  };


  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
  <div className="max-w-6xl mx-auto px-4  py-24 font-english">
      <h2
        className="text-3xl md:text-4xl text-center font-bold text-blue-900 mb-4 font-bangla"
      >
        👨‍🏫 আমাদের শিক্ষকবৃন্দ
      </h2>

       <p className="text-gray-700 text-center font-bangla text-lg max-w-2xl mx-auto mb-12 text">
       আমাদের শিক্ষকদের প্রয়োজনীয় তথ্যগুলো যোগাযোগের ক্ষেত্রে নীচে দেওয়া হয়েছে 
        </p>

  {teachers.length === 0 ? (
    <p className="text-center text-gray-500">No teachers found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.map((teacher) => (
        <div
          key={teacher._id}
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 "
        >
          <img
            src={teacher.image}
            alt={teacher.name}
            className="w-28 h-28 object-cover rounded-full mx-auto  border border-gray-300"
          />
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-900">{teacher.name}</h3>
            <p className="text-blue-500 font-semibold text-sm border-b pb-1">{teacher.designation}</p>
            <p className="text-gray-500 text-sm mt-2 ">
              📧 {teacher.email}
            </p>
            <p className='text-gray-500 text-sm my-1'>📞 {teacher.phone}</p>
            <p className="text-sm text-gray-500">
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