// TeacherNoticeShow.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
 import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
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
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "This notice will be permanently deleted!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:5000/notices/${id}`);
      
      // Show success alert
      await Swal.fire({
        title: 'Deleted!',
        text: 'Notice deleted successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      // Update local state
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice._id !== id)
      );

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed!',
        text: 'Something went wrong while deleting the notice.',
      });
    }
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
      toast.success("notice updated successfully");
      setTimeout(() => {
        setNotices(updated);
        setEditingNotice(null);
      }, 1000); // 1 second delay so toast shows
    } catch (err) {
      toast.error('Update failed.');
    }
  };

  return (
<div className="max-w-6xl mx-auto  font-bangla">
  <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Manage Notices</h2>

  <div className="overflow-x-auto rounded shadow">
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-blue-100 text-gray-700">
        <tr>
          <th className="py-3 px-4 border text-center">#</th>
          <th className="py-3 px-4 border">Date</th>
          <th className="py-3 px-4 border">Title</th>
          <th className="py-3 px-4 border">File</th>
          <th className="py-3 px-4 border text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice, index) => (
          <tr key={notice._id} className="hover:bg-gray-50">
            <td className="py-3 px-4 border text-center">{index + 1}</td>
            <td className="py-3 px-4 border">{notice.date}</td>
            <td className="py-3 px-4 border">{notice.title}</td>
            <td className="py-3 px-4 border">
              <a
                href={`http://localhost:5000${notice.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                View File
              </a>
            </td>
            <td className="py-3 px-4 border text-center space-x-2">
              <button
                onClick={() => setEditingNotice(notice)}
                className="bg-green-600 lg:mb-0 mb-2  hover:bg-green-700 text-white px-3 py-1 rounded shadow-sm transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(notice._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Edit Modal */}
  {editingNotice && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Edit Notice</h3>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={editingNotice.title}
              onChange={handleEditChange}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={editingNotice.date}
              onChange={handleEditChange}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Posted By</label>
            <input
              type="text"
              name="postedBy"
              value={editingNotice.postedBy}
              onChange={handleEditChange}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingNotice(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Toaster position='top-right'/>
    </div>
  )}
</div>

  );
};

export default TeacherNoticeShow;
