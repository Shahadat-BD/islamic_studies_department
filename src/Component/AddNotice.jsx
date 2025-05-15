import React, { useState, useRef } from 'react';
import axios from 'axios';

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !postedBy || !file) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('postedBy', postedBy);
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/notices/add', formData);
      alert('Notice added!');
      setTitle('');
      setDate('');
      setPostedBy('');
      setFile(null);
      fileInputRef.current.value = null;
    } catch (err) {
      console.error(err);
      alert('Failed to add notice');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Title" className="w-full p-2 border" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" className="w-full p-2 border" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="Posted by" className="w-full p-2 border" value={postedBy} onChange={(e) => setPostedBy(e.target.value)} />
        <input type="file" className="w-full" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddNotice;
