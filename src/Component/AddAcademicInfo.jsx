import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const AddAcademicInfo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registrationNumber: '',
    classRoll: '',
    mobileNumber: '',
    session: '',
    year: '',
  });

  // Set email from context
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://islamic-studies-backend.onrender.com/academic-info', formData);
      toast.success("Academic info saved successfully!");
      navigate('/dashboard/my-academic-info')
      // Reset form (email kept)
      setFormData({
        name: '',
        email: user?.email || '',
        registrationNumber: '',
        classRoll: '',
        mobileNumber: '',
        session: '',
        year: '',
      });
    } catch (err) {
    if (err.response && err.response.status === 409) {
      toast.error('You have already submitted your information!');
      
    } else {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded font-english">
      <div className='bg-blue-900 text-white rounded-t p-3 mb-2'>
         <h2 className="text-xl font-bold">📄 Add Academic Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          required
          className="border p-2 w-full"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          readOnly
          className="border p-2 w-full bg-gray-100 text-gray-700 cursor-not-allowed"
        />

        <input
          name="registrationNumber"
          type="text"
          placeholder="Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
          autoComplete="off"
          required
          className="border p-2 w-full"
        />

        <input
          name="classRoll"
          type="text"
          placeholder="Class Roll"
          value={formData.classRoll}
          onChange={handleChange}
          autoComplete="off"
          required
          className="border p-2 w-full"
        />

        <input
          name="mobileNumber"
          type="text"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          autoComplete="off"
          required
          className="border p-2 w-full"
        />

        <input
          name="session"
          type="text"
          placeholder="Session (e.g. 2021-22)"
          value={formData.session}
          onChange={handleChange}
          autoComplete="off"
          required
          className="border p-2 w-full"
        />

        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          autoComplete="off"
          required
          className="border w-full p-2"
        >
          <option value="">Select Year</option>
          <option>Honours 1st Year</option>
          <option>Honours 2nd Year</option>
          <option>Honours 3rd Year</option>
          <option>Honours 4th Year</option>
          <option>Master's</option>
        </select>

        <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>

      <Toaster position="top-right" />
    </div>
  );
};

export default AddAcademicInfo;
