import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    const res = await axios.get('http://localhost:5000/api/teachers');
    setTeachers(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      fetchTeachers();
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">All Teachers</h2>
      <div className="grid gap-4">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="border p-4 rounded shadow flex gap-4">
            <img src={teacher.image} alt={teacher.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{teacher.name}</h3>
              <p>{teacher.designation}</p>
              <p>{teacher.email} | {teacher.phone}</p>
              <p>Department: {teacher.department}</p>
            </div>
            <div className="space-x-2">
              <Link to={`/edit-teacher/${teacher._id}`} className="text-blue-500">Edit</Link>
              <button onClick={() => handleDelete(teacher._id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;