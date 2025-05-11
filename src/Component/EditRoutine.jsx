import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRoutine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/routines/${id}`)
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
      await axios.put(`http://localhost:5000/api/routines/${id}`, formData);
      alert('Routine updated!');
      navigate('/dashboard/routines');
    } catch (err) {
      alert('Update failed!');
      console.error(err);
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Routine</h2>
      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          type="text"
          name="department"
          placeholder='department'
          value={formData.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="year"
            placeholder='year'
            value={formData.year}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="text"
            name="day"
            placeholder='day'
            value={formData.day}
            onChange={handleChange}
            className="border p-2 rounded w-1/2"
          />
        </div>

        <input
          type="text"
          name="room"
          value={formData.room}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <h3 className="font-semibold text-lg mt-6 mb-2">Routine Slots</h3>
        {formData.slots.map((slot, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 mb-2">
            <input
              type="text"
              value={slot.time}
              onChange={(e) => handleSlotChange(index, 'time', e.target.value)}
              className="border p-2 rounded"
              placeholder='time'
            />
            <input
              type="text"
              value={slot.subjectSymbol}
              onChange={(e) => handleSlotChange(index, 'subjectSymbol', e.target.value)}
              className="border p-2 rounded"
              placeholder='subject code'
            />
            <input
              type="text"
              value={slot.subjectName}
              onChange={(e) => handleSlotChange(index, 'subjectName', e.target.value)}
              className="border p-2 rounded"
              placeholder='subject Name'
            />
            <input
              type="text"
              value={slot.teacher}
              onChange={(e) => handleSlotChange(index, 'teacher', e.target.value)}
              className="border p-2 rounded"
              placeholder='teacher name'
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Routine
        </button>
      </form>
    </div>
  );
};

export default EditRoutine;
