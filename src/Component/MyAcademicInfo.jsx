import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { BookOpenCheck } from 'lucide-react';

const MyAcademicInfo = () => {
  const { user } = useContext(AuthContext);
  console.log('all user details', user);

  const [myInfo, setMyInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/academic-info/my-info/${user.email}`);
        setMyInfo(res.data);
        setFormData(res.data); // pre-fill for edit
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyInfo();
  }, [user]);
  console.log("it is my information", myInfo);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/academic-info/${myInfo._id}`, formData);
      alert("Academic info updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:5000/academic-info/${myInfo._id}`);
      alert("Deleted successfully");
      setMyInfo(null);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (!myInfo) {
    return <p className="text-center text-gray-600 mt-10">No academic info found</p>;
  }

  return (
    <div className="lg:w-3/4 mx-auto w-full bg-white  rounded shadow-lg font-english border-b-4 border-blue-900">
      <div className='bg-blue-900 text-white rounded-t'>
        <h2 className="text-xl font-bold flex p-4 items-center gap-2"><BookOpenCheck size={23}/> My Academic Info</h2>
      </div>

      <div className='py-8 px-6'>
        {editMode ? (
          <>
            <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="classRoll" value={formData.classRoll} onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="border p-2 w-full mb-2" />
            <input name="session" value={formData.session} onChange={handleChange} className="border p-2 w-full mb-2" />
            <select name="year" value={formData.year} onChange={handleChange} className="border w-full p-2 mb-4">
              <option>Honours 1st Year</option>
              <option>Honours 2nd Year</option>
              <option>Honours 3rd Year</option>
              <option>Honours 4th Year</option>
              <option>Master's</option>
            </select>
            <div className="flex justify-between">
              <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </>
        ) : (
          <div className="flex lg:flex-row flex-col items-center gap-8">
            <div>
              <img className='w-full h-[280px] border-2 border-blue-900 rounded-md' src={user.photoURL} alt="" srcset="" />
            </div>

            <div>
              <p className='pb-2'><strong>Name:</strong> {myInfo.name}</p>
              <p className='pb-2'><strong>Email:</strong> {myInfo.email}</p>
              <p className='pb-2'><strong>Reg. No:</strong> {myInfo.registrationNumber}</p>
              <p className='pb-2'><strong>Class Roll:</strong> {myInfo.classRoll}</p>
              <p className='pb-2'><strong>Mobile:</strong> {myInfo.mobileNumber}</p>
              <p className='pb-2'><strong>Session:</strong> {myInfo.session}</p>
              <p className='pb-2'><strong>Year:</strong> {myInfo.year}</p>

              <div className="flex gap-3 mt-3">
                <button onClick={() => setEditMode(true)} className="bg-blue-900 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default MyAcademicInfo;
