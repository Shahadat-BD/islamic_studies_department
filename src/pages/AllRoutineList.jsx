import { useEffect, useState } from 'react';
import axios from 'axios';

const AllRoutineList = () => {
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

  useEffect(() => {
    const result = routines.filter((item) => item.year === selectedYear && item.day === dayFilter);
    setFiltered(result);
  }, [selectedYear, routines, dayFilter]);




  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 pt-24 font-english">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">📘 Routine List</h2>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      {/* Routine Display */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          There are no classes on <span className="text-green-600 font-semibold">{dayFilter}</span> for <span className="text-red-500 font-semibold">{selectedYear}</span>.
        </p>
      ) : (
        filtered.map((routine) => (
          <div
            key={routine._id}
            className="bg-white border border-gray-200 shadow-md rounded-xl mb-8 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-3 flex justify-between items-center">
              <h3 className="text-lg font-bold">📚 {routine.year} - {routine.day}</h3>
              <span className="text-sm italic">🗓 Created: {routine.RoutineCreated}</span>
            </div>

            {/* Meta Info */}
            <div className="p-4 lg:text-base text-sm text-gray-700">
              🏫 Department: <span className="font-medium">{routine.department}</span> &nbsp;|&nbsp; 🏠 Room: <span className="font-medium">{routine.room}</span>
            </div>

            {/* Slot Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-t border-gray-200">
                <thead className="bg-gray-100 font-bold lg:text-lg">
                  <tr>
                    <th className="px-4 py-2 border">⏰ Time</th>
                    <th className="px-4 py-2 border">🔤 Code</th>
                    <th className="px-4 py-2 border">📖 Subject</th>
                    <th className="px-4 py-2 border">👤 Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {routine.slots.map((slot, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-4 py-3 border lg:text-lg">{slot.time || "-"}</td>
                      <td className="px-4 py-3 border lg:text-lg">{slot.subjectSymbol || "-"}</td>
                      <td className="px-4 py-3 border lg:text-lg">{slot.subjectName || "-"}</td>
                      <td className="px-4 py-3 border lg:text-lg">{slot.teacher || "-"}</td>
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

export default AllRoutineList;
