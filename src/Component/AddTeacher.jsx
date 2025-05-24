import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { UserPlus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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
    await axios.post(`${import.meta.env.VITE_API_URL}/api/teachers`, formData);
    toast.success('teacher information added successfully !')
    navigate('/dashboard/teachers');
  } catch (err) {
    if (err.response && err.response.status === 409) {
      toast.error('You have already submitted your information.');
      
    } else {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  }
};

 
  return (
    <div className="max-w-2xl mx-auto  bg-white shadow-lg rounded-xl mt-8 font-english">
 <div className='bg-blue-900 text-white rounded-t-xl py-3'>
   <h2 className="text-2xl font-bold pl-5  flex items-center gap-4">
     <UserPlus size={25} /> Add Teacher
  </h2>
 </div>

  <form onSubmit={handleSubmit} className="space-y-5 p-6">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Full Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Designation */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Designation
      </label>
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        placeholder="Lecturer / Assistant Professor"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        value={user.email}
        readOnly
        className="w-full border bg-gray-100 text-gray-500 rounded-lg px-4 py-2 cursor-not-allowed"
        required
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="01XXXXXXXXX"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Department */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Department
      </label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Arabic & Islamic Studies"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Image URL */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Image URL
      </label>
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="https://example.com/photo.jpg"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Submit Button */}
    <div className="pt-4">
      <button
        type="submit"
        className="w-full bg-blue-900 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Submit
      </button>
    </div>
  </form>
  <Toaster position='top-right'/>
</div>

  );
};

export default AddTeacher;
