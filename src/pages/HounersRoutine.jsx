import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';

const HonoursRoutine = () => {
  const [routines, setRoutines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedYear] = useState('Honours 3rd Year'); // ✅ Hardcoded Year
  const [dayFilter, setDayFilter] = useState('Sunday'); // ✅ Default day

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/routines`).then((res) => {
      setRoutines(res.data);
    });
  }, []);

  useEffect(() => {
    const result = routines.filter(
      (item) => item.year === selectedYear && item.day === dayFilter
    );
    setFiltered(result);
  }, [selectedYear, routines, dayFilter]);

  return (
    <div className="py-12 bg-white px-4 md:px-12 lg:px-20 font-bangla">

    <div className="text-center mb-14 font-bangla" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
           📅  ক্লাস রুটিন
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto font-bangla">
            এখানে শুধু অনার্স তৃতীয় বর্ষের রুটিন দেওয়া হয়েছে বাকি রুটিন দেখতে <span className='text-blue-900 font-semibold'>'সকল ইয়ারের রুটিন দেখুন'</span> বাটনে ক্লিক করুন
          </p>
        </div>

      {/* Routine Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-red-500 text-lg">
          No class on <span className="font-bold text-green-600">{dayFilter}</span> for{' '}
          <span className="font-bold text-blue-900">{selectedYear}</span>
        </p>
      ) : (
        <div className="gap-6">
          {filtered.map((routine, idx) => (
            <div
              key={routine._id}
              className="bg-white border rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-blue-900 mb-1">
                  📘 {routine.year} - {routine.day}
                </h3>
                <p className="text-sm text-gray-600">
                  🏫 Department: <span className="font-medium">{routine.department}</span> | 🏠 Room: <span className="font-medium">{routine.room}</span>
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border text-md text-gray-700">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="border px-3 py-2">⏰ Time</th>
                      <th className="border px-3 py-2">Code</th>
                      <th className="border px-3 py-2">Subject</th>
                      <th className="border px-3 py-2">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routine.slots.map((slot, index) => (
                      <tr key={index}>
                        <td className="border px-3 py-2">{slot.time}</td>
                        <td className="border px-3 py-2">{slot.subjectSymbol || '-'}</td>
                        <td className="border px-3 py-2">{slot.subjectName || '-'}</td>
                        <td className="border px-3 py-2">{slot.teacher || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">

        <NavLink to={'/all-routine-list'} 
        className={'inline-block px-6 py-3 bg-blue-900 text-white rounded-full shadow hover:bg-blue-800 transition'}
        >📚 সকল ইয়ারের রুটিন দেখুন</NavLink>

      </div>
    </div>
  );
};

export default HonoursRoutine;
