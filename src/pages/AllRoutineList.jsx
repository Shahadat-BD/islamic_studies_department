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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Routine List</h2>

      {/* Filter by Year Only */}
      <div className="mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-4"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

              <select
                  className="border p-2 rounded"
                  value={dayFilter}
                  onChange={(e) => setDayFilter(e.target.value)}
              >
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
                      <option key={day} value={day}>
                          {day}
                      </option>
                  ))}
              </select>

      </div>

      {/* Routine Cards */}
  
   
      {filtered.length === 0 ? (
        <p>There are no classes on <span className='text-green-500 font-bold'>{dayFilter}</span> for <span className='text-red-500 font-bold'>{selectedYear}</span></p>
      ) : (
        filtered.map((routine) => (
          <div
            key={routine._id}
            className="bg-white shadow rounded p-4 mb-6 border border-gray-200"
          >
            <div className="mb-2 font-semibold text-lg flex justify-between">
              <p>📚 {routine.year} - {routine.day}</p>
              <p>Routine Created <span className='text-red-400'>{routine.RoutineCreated}</span></p>
            </div>
            <div className="text-sm mb-2 text-gray-700">
              🏫 Department: {routine.department} | 🏠 Room: {routine.room}
            </div>
            <table className="w-full border mt-2 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Time</th>
                  <th className="border px-2 py-1">Subject Code</th>
                  <th className="border px-2 py-1">Subject</th>
                  <th className="border px-2 py-1">Teacher</th>
                </tr>
              </thead>
              <tbody>
                {routine.slots.map((slot, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{slot.time}</td>
                    <td className="border px-2 py-1">{slot.subjectSymbol || '-'}</td>
                    <td className="border px-2 py-1">{slot.subjectName || '-'}</td>
                    <td className="border px-2 py-1">{slot.teacher || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
   
       
    </div>
  );
};

export default AllRoutineList;
