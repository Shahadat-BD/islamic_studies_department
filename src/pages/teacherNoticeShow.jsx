// TeacherNoticeShow.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherNoticeShow = () => {
  const [notices, setNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/notices');
      setNotices(res.data);
    } catch (err) {
      console.error('Error fetching notices:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      await axios.delete(`http://localhost:5000/notices/${id}`);
      setNotices(notices.filter(notice => notice._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete notice.');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingNotice(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/notices/${editingNotice._id}`, editingNotice);
      const updated = notices.map(notice =>
        notice._id === editingNotice._id ? res.data : notice
      );
      setNotices(updated);
      setEditingNotice(null);
    } catch (err) {
      console.error(err);
      alert('Update failed.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Notices</h2>

      <table className="table-auto w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">File</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice,index) => (
            <tr key={notice._id}>
              <td className="py-2 px-4 border">{index + 1}</td>
               <td className="py-2 px-4 border">{notice.date}</td>
              <td className="py-2 px-4 border">{notice.title}</td>
              <td className="py-2 px-4 border">
                <a href={`http://localhost:5000${notice.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View File
                </a>
              </td>
              <td className="py-2 px-4 border space-x-2">
                <button
                  onClick={() => setEditingNotice(notice)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >Edit</button>
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingNotice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-xl font-semibold mb-4">Edit Notice</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editingNotice.title}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={editingNotice.date}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Posted By:</label>
                <input
                  type="text"
                  name="postedBy"
                  value={editingNotice.postedBy}
                  onChange={handleEditChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingNotice(null)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >Cancel</button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherNoticeShow;
