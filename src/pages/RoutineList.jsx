import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedYear, setSelectedYear] = useState('Honours 1st Year'); // ✅ Default value

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
    const result = routines.filter((item) => item.year === selectedYear);
    setFiltered(result);
  }, [selectedYear, routines]);


  const handleDeleteRoutine = async (id) => {
    if (confirm('Are you sure?')) {
      await axios.delete(`http://localhost:5000/api/routines/${id}`);
       fetchAllRoutines();
    }
  };
   


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Routine List</h2>

      {/* Filter by Year Only */}
      <div className="mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Routine Cards */}
      {filtered.length === 0 ? (
        <p>No routines found for {selectedYear}.</p>
      ) : (
        filtered.map((routine) => (
          <div
            key={routine._id}
            className="bg-white shadow rounded p-4 mb-6 border border-gray-200"
          >
            <div className="mb-2 font-semibold text-lg flex justify-between">
              <p>📚 {routine.year} - {routine.day}</p>
                    <Link
                        to={`/edit-routine/${routine._id}`}
                        className="text-blue-600 hover:underline"
                    >
                        ✏️Routine Edit
                    </Link>

                    <button className='bg-red-500 px-2 py-1 rounded-md text-white ' onClick={()=>handleDeleteRoutine(`${routine._id}`)}>Delete Routine</button>

            </div>
            <div className="text-sm mb-2 text-gray-700">
              🏫 Department: {routine.department} | 🏠 Room: {routine.room}
            </div>
            <table className="w-full border mt-2 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Time</th>
                  <th className="border px-2 py-1">Code</th>
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

export default RoutineList;
