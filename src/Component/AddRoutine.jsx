import { useState } from 'react';
import axios from 'axios';

const AddRoutine = () => {
  const [formData, setFormData] = useState({
    department: '',
    year: '',
    day: '',
    room: '',
    slots: Array(6).fill({ time: '', subjectSymbol: '', subjectName: '', teacher: '' }),
  });

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
      await axios.post('http://localhost:5000/api/routines', formData);
      setFormData({
        department: '',
        year: '',
        day: '',
        room: '',
        slots: Array(6).fill({ time: '', subjectSymbol: '', subjectName: '', teacher: '' }),
      });
    alert('Routine added successfully!');
    
    } catch (err) {
      alert('Failed to add routine.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Routine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Department */}
        <input
          type="text"
          name="department"
          placeholder="Department Name"
          value={formData.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Year & Day */}
        <div className="flex gap-4">
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
            required
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
            required
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Room */}
        <input
          type="text"
          name="room"
          placeholder="Room Number"
          value={formData.room}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Slots */}
        <h3 className="font-semibold text-lg mt-6 mb-2">Routine Slots</h3>
        {formData.slots.map((slot, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 mb-2">
            <input
              type="text"
              placeholder="Time"
              value={slot.time}
              onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Subject Code"
              value={slot.subjectSymbol}
              onChange={(e) => handleSlotChange(index, 'subjectSymbol', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Subject Name"
              value={slot.subjectName}
              onChange={(e) => handleSlotChange(index, 'subjectName', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Teacher Name"
              value={slot.teacher}
              onChange={(e) => handleSlotChange(index, 'teacher', e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Routine
        </button>
      </form>
    </div>
  );
};

export default AddRoutine;
