import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); // or 'asc'

  useEffect(() => {
    axios.get('http://localhost:5000/notices')
      .then(res => {
        setNotices(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching notices:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center pt-32">Loading notices...</p>;

  if (notices.length === 0) return <p className="text-center pt-32">No notices found.</p>;


const sortedNotices = [...notices].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);

  return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
});


  return (
    <div className="max-w-6xl mx-auto p-4 pt-24 font-english">
    <h2 className="text-2xl font-bold mb-4 text-center">All Notices</h2>
   
  <div className="overflow-x-auto">

       
  <button
    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
  >
    Sort by Date: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
  </button>

    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-gray-700 text-left">
          <th className="py-3 px-4 border"> # </th>
          <th className="py-3 px-4 border">Date</th>
          <th className="py-3 px-4 border">Title</th>
          {/* <th className="py-3 px-4 border">Posted By</th> */}
          <th className="py-3 px-4 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedNotices.map((notice,index) => (
          <tr key={notice._id} className="hover:bg-gray-50">
            <td className="py-3 px-4 border">{index + 1}</td>
            <td className="py-3 px-4 border">{notice.date}</td>
            <td className="py-3 px-4 border">{notice.title}</td>
            {/* <td className="py-3 px-4 border">{notice.postedBy}</td> */}
            <td className="py-3 px-4 border">
              <a
                href={`http://localhost:5000${notice.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline bg-green-600 px-3 py-2 rounded"
              >
                View / Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ShowNotice;
