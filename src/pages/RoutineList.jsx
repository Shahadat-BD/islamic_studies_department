import {  useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedYear, setSelectedYear] = useState('Honours 1st Year'); // ✅ Default value
  const [dayFilter, setDayFilter] = useState("Sunday"); // default value
   



  const years = [
    'Honours 1st Year',
    'Honours 2nd Year',
    'Honours 3rd Year',
    'Honours 4th Year',
    "Masters",
  ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/routines').then((res) => {
            setRoutines(res.data);
        });
    }, []);

 
    const fetchAllRoutines = async () => {
        const res = await axios.get('http://localhost:5000/api/routines');
         setRoutines(res.data);
    };



  useEffect(() => {
    const result = routines.filter((item) => item.year === selectedYear && item.day === dayFilter);
    setFiltered(result);
  }, [selectedYear, routines, dayFilter]);


  const handleDeleteRoutine = async (id) => {
    if (confirm('Are you sure?')) {
      await axios.delete(`http://localhost:5000/api/routines/${id}`);
       fetchAllRoutines();
    }
  };
   


  return (
    <div className="max-w-7xl mx-auto px-4  font-english">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
    📘 Routine List
  </h2>

  {/* Filter Section */}
  <div className="flex flex-col sm:flex-row justify-left items-center gap-4 mb-10">
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {years.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>

    <select
      value={dayFilter}
      onChange={(e) => setDayFilter(e.target.value)}
      className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
        <option key={day} value={day}>{day}</option>
      ))}
    </select>
  </div>

  {/* Routine Display */}
  {filtered.length === 0 ? (
    <p className="text-center text-gray-600 text-lg">
      No classes on <span className="text-green-600 font-semibold">{dayFilter}</span> for <span className="text-red-500 font-semibold">{selectedYear}</span>.
    </p>
  ) : (
    filtered.map((routine) => (
      <div
        key={routine._id}
        className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-8 transition duration-300 hover:shadow-lg"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
          <h3 className="text-xl font-bold text-indigo-700 mb-2 md:mb-0">
            📚 {routine.year} - {routine.day}
          </h3>

          <div className="flex flex-wrap gap-2 items-center">
            <Link
              to={`/dashboard/edit-routine/${routine._id}`}
             className="bg-green-600  hover:bg-green-700 text-white px-3 py-1 rounded shadow-sm transition"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDeleteRoutine(routine._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Meta Info */}
        <p className="text-gray-700 text-sm mb-4">
          🏫 <span className="font-medium">{routine.department}</span> | 🏠 Room: <span className="font-medium">{routine.room}</span>
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-lg">
            <thead className="bg-indigo-50 text-gray-700 font-semibold">
              <tr>
                <th className="border px-4 py-2 text-left">⏰ Time</th>
                <th className="border px-4 py-2 text-left">🔤 Code</th>
                <th className="border px-4 py-2 text-left">📖 Subject</th>
                <th className="border px-4 py-2 text-left">👤 Teacher</th>
              </tr>
            </thead>
            <tbody>
              {routine.slots.map((slot, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{slot.time || '-'}</td>
                  <td className="border px-4 py-2">{slot.subjectSymbol || '-'}</td>
                  <td className="border px-4 py-2">{slot.subjectName || '-'}</td>
                  <td className="border px-4 py-2">{slot.teacher || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ))
  )}
</div>

  );
};

export default RoutineList;
