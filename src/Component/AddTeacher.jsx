import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const AddTeacher = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '', // initial empty
    phone: '',
    department: '',
    image: '',
  });

  const navigate = useNavigate();

  // ✅ When user.email is available, set it to formData.email
  useEffect(() => {
    if (user?.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/teachers', formData);
    navigate('/dashboard/teachers');
  } catch (err) {
    if (err.response && err.response.status === 409) {
      alert('You have already submitted your information.');
      
    } else {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  }
};


  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">
        Please submit your information as a Teacher
      </h2>
      <h1 className="text-xl font-semibold mb-4 text-red-400">
        Note: Only this form use one time
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'designation', 'email', 'phone', 'department', 'image'].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={field === 'email' ? user.email : formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full border p-2 rounded"
              required
              readOnly={field === 'email'}
            />
          )
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
