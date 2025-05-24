import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ScrollText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !postedBy || !file) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('postedBy', postedBy);
    formData.append('file', file);

    try {
      const res = await axios.post('https://islamic-studies-backend.onrender.com/notices/add', formData);
      toast.success('Notice added successfully !');
      setTitle('');
      setDate('');
      setPostedBy('');
      setFile(null);
      fileInputRef.current.value = null;
    } catch (err) {
      console.error(err);
      toast.error('Failed to add notice. please try again ! ');
    }
  };

  return (
  <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md mt-8 font-english">
<div className='bg-blue-900 text-white rounded-t-xl py-3'>
   <h2 className="text-2xl font-bold pl-5  flex items-center gap-4">
     <ScrollText size={25} /> Add Notice
  </h2>
 </div>
  <form onSubmit={handleSubmit} className="space-y-5 p-6">

    {/* Title */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Notice Title</label>
      <input
        type="text"
        placeholder="Enter notice title"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
     
      />
    </div>

    {/* Date */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Notice Date</label>
      <input
        type="date"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={date}
        onChange={(e) => setDate(e.target.value)}
 
      />
    </div>

    {/* Posted By */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Posted By</label>
      <input
        type="text"
        placeholder="Your name"
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={postedBy}
        onChange={(e) => setPostedBy(e.target.value)}
    
      />
    </div>

    {/* File Upload */}
    <div>
      <label className="block text-gray-700 mb-1 font-medium">Attach File (optional)</label>
      <input
        type="file"
        className="w-full file:border file:border-gray-300 file:p-1 file:rounded file:bg-blue-50 file:text-blue-700"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files[0])}
      />
    </div>

    {/* Submit Button */}
    <div className="text-center">
      <button
        type="submit"
        className="bg-blue-900 w-full hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
      >
        Submit Notice
      </button>
    </div>
  </form>
  <Toaster position='top-right'></Toaster>
</div>

  );
};

export default AddNotice;
