import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';import { CalendarPlus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthProvider';
;

const AddRoutine = () => {
  const {getToken} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    department: '',
    year: '',
    day: '',
    RoutineCreated : "",
    room: '',
    slots: Array(6).fill({ time: '', subjectSymbol: '', subjectName: '', teacher: '' }),
  });
 const navigate = useNavigate()
  const years = [
    'Honours 1st Year',
    'Honours 2nd Year',
    'Honours 3rd Year',
    'Honours 4th Year',
    "Masters",
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...formData.slots];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };
    setFormData({ ...formData, slots: updatedSlots });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token =  await getToken()
      await axios.post(`${import.meta.env.VITE_API_URL}/api/routines`, 
        formData,{
          headers : {
             Authorization: `Bearer ${token}`, // ✅ Token attach করা হলো
            'Content-Type': 'application/json'
          }
        });
      setFormData({
        department: '',
        year: '',
        RoutineCreated :"",
        day: '',
        room: '',
        slots: Array(6).fill({ time: '', subjectSymbol: '', subjectName: '', teacher: '' }),
      });
    toast.success('Routine added successfully!');
    navigate("/dashboard/routines")
    } catch (err) {
      toast.error('Failed to add routine.');
      console.error(err);
    }
  };

  return (
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl border border-gray-100 font-english">
  <div className='bg-blue-900 text-white rounded-t-xl py-2'>
   <h2 className="text-2xl font-bold pl-5 flex items-center gap-4">
     <CalendarPlus size={25} /> Add Routine
  </h2>
 </div>
  <form onSubmit={handleSubmit} className="space-y-6 px-6 py-10">

    {/* Department & Creator */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="department"
        placeholder="Department Name"
        value={formData.department}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="text"
        name="RoutineCreated"
        placeholder="Routine Creator Name"
        value={formData.RoutineCreated}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    {/* Year & Day */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select
        name="year"
        value={formData.year}
        onChange={handleChange}
        className="p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      >
        <option value="">🎓 Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <select
        name="day"
        value={formData.day}
        onChange={handleChange}
        className="p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      >
        <option value="">📅 Select Day</option>
        {days.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
    </div>

    {/* Room */}
    <input
      type="text"
      name="room"
      placeholder="🏫 Room Number"
      value={formData.room}
      onChange={handleChange}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />

    {/* Routine Slots */}
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">📋 Routine Slots</h3>
      {formData.slots.map((slot, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <input
            type="text"
            placeholder="🕒 Time"
            value={slot.time}
            onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="📘 Subject Code"
            value={slot.subjectSymbol}
            onChange={(e) => handleSlotChange(index, 'subjectSymbol', e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="📗 Subject Name"
            value={slot.subjectName}
            onChange={(e) => handleSlotChange(index, 'subjectName', e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="👨‍🏫 Teacher Name"
            value={slot.teacher}
            onChange={(e) => handleSlotChange(index, 'teacher', e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      ))}
    </div>

    {/* Submit Button */}
    <div className="text-center pt-4">
      <button
        type="submit"
        className="bg-blue-900 w-full hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
      >
        ✅ Submit Routine
      </button>
    </div>
  </form>
  <Toaster position='top-right'/>
</div>

  );
};

export default AddRoutine;
