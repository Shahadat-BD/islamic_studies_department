import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const AddNotice = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/notices', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Notice added!');
      setTitle('');
      setDate('');
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Failed to add notice');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">📌 Add New Notice</h2>
      <input
        type="text"
        placeholder="Notice Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Notice
      </button>
    </form>
  );
};

export default AddNotice;
