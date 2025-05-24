
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const EditTeacher = () => {
  const {user} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    department: '',
    image: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/teachers/${id}`).then((res) => {
      setFormData(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/teachers/${id}`, formData);
      toast.success('teacher info updated successfully!');
       // Navigate after short delay
    setTimeout(() => {
      navigate('/dashboard/teachers');;
    }, 1500); // 1.5 second delay

    } catch (err) {
       toast.error("something is wrong.teacher info not updated")
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'designation', 'email', 'phone', 'department', 'image'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field] || ''}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border p-2 rounded"
            required
            readOnly={field === 'email'} 
          />
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
      <Toaster position='top-right'/>
    </div>
  );
};

export default EditTeacher;