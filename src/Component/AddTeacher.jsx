import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    department: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/teachers', formData);
      navigate('/teachers');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'designation', 'email', 'phone', 'department', 'image'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border p-2 rounded"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
