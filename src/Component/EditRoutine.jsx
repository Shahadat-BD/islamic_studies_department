import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const EditRoutine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/routines/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...formData.slots];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };
    setFormData({ ...formData, slots: updatedSlots });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/routines/${id}`, formData);
      toast.success('Routine updated successfully!');
      
       // Navigate after short delay
    setTimeout(() => {
      navigate('/dashboard/routines');
    }, 1500); // 1.5 second delay

    } catch (err) {
      toast.error('Update failed!');
    }
  };

  if (!formData) return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-4 pt-0">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">✏️ Edit Class Routine</h2>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">

        {/* Department */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Islamic Studies"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Year and Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g., 2nd Year"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Day</label>
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleChange}
              placeholder="e.g., Monday"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Room */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Room No.</label>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            placeholder="e.g., 301"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Routine Slots */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📚 Routine Slots</h3>
          <div className="space-y-4">
            {formData.slots.map((slot, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  value={slot.time}
                  onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
                  placeholder="Time (e.g., 9:00-9:50)"
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={slot.subjectSymbol}
                  onChange={(e) => handleSlotChange(index, 'subjectSymbol', e.target.value)}
                  placeholder="Subject Code"
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={slot.subjectName}
                  onChange={(e) => handleSlotChange(index, 'subjectName', e.target.value)}
                  placeholder="Subject Name"
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={slot.teacher}
                  onChange={(e) => handleSlotChange(index, 'teacher', e.target.value)}
                  placeholder="Teacher Name"
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 w-full text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
          >
            ✅ Update Routine
          </button>
        </div>
      </form>
      <Toaster position='top-right'/>
    </div>
  );
};

export default EditRoutine;
