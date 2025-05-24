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
    axios.get(`${import.meta.env.VITE_API_URL}/api/routines`).then((res) => {
      setRoutines(res.data);
    });
  }, []);

  useEffect(() => {
    const result = routines.filter((item) => item.year === selectedYear && item.day === dayFilter);
    setFiltered(result);
  }, [selectedYear, routines, dayFilter]);




  return (
 <div className="max-w-6xl mx-auto px-4 pb-12 pt-24 font-english">
  <h2 className="text-4xl font-bold mb-4 text-center text-blue-900 font-bangla tracking-wide">
    📅 ক্লাস রুটিন
  </h2>
  <p className="text-gray-700 text-lg mb-4 text-center font-bangla">
   এখানে সকল বর্ষের ক্লাস রুটিন দেওয়া হয়েছে. <span className='text-blue-500 font-bold'>দিন এবং বর্ষ সিলেক্ট</span> করে ক্লাস রুটিন দেখুন.
  </p>

  {/* Filter Section */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      className="border border-gray-300 rounded-lg px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
    >
      {years.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>

    <select
      value={dayFilter}
      onChange={(e) => setDayFilter(e.target.value)}
      className="border border-gray-300 rounded-lg px-5 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
    >
      {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
        <option key={day} value={day}>{day}</option>
      ))}
    </select>
  </div>

  {/* Routine Display */}
  {filtered.length === 0 ? (
    <p className="text-center text-gray-600 text-lg">
      No classes on <span className="text-green-600 font-semibold">{dayFilter}</span> for 
      <span className="text-red-500 font-semibold"> {selectedYear}</span>.
    </p>
  ) : (
    filtered.map((routine) => (
      <div
        key={routine._id}
        className="bg-white border border-gray-200 shadow-md rounded-2xl mb-10 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h3 className="text-xl font-bold">📚 {routine.year} - {routine.day}</h3>
          <span className="text-sm italic">🗓 Created: {routine.RoutineCreated}</span>
        </div>

        {/* Meta Info */}
        <div className="px-6 py-3 text-gray-700 text-base border-b">
          <span className="mr-4">🏫 <span className="font-medium">{routine.department}</span></span>
          <span>🏠 Room: <span className="font-medium">{routine.room}</span></span>
        </div>

        {/* Slot Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-800">
            <thead className="bg-blue-50 text-blue-800 font-semibold text-sm sm:text-base">
              <tr>
                <th className="px-6 py-3 border">⏰ Time</th>
                <th className="px-6 py-3 border">🔤 Code</th>
                <th className="px-6 py-3 border">📖 Subject</th>
                <th className="px-6 py-3 border">👤 Teacher</th>
              </tr>
            </thead>
            <tbody>
              {routine.slots.map((slot, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 border text-sm sm:text-base">{slot.time || "-"}</td>
                  <td className="px-6 py-4 border text-sm sm:text-base">{slot.subjectSymbol || "-"}</td>
                  <td className="px-6 py-4 border text-sm sm:text-base">{slot.subjectName || "-"}</td>
                  <td className="px-6 py-4 border text-sm sm:text-base">{slot.teacher || "-"}</td>
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
