import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); // or 'asc'

  useEffect(() => {
    axios.get('https://islamic-studies-backend.onrender.com/notices')
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
<div className="max-w-6xl mx-auto px-4 py-24 font-english">
  <h2 className="text-3xl font-semibold text-center text-blue-900 mb-8 font-bangla">📢 সকল নোটিশ দেখুন</h2>

  {/* Sort Button */}
  <div className="flex justify-left mb-4">
    <button
      onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
      className="bg-blue-900 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
    >
      Sort by Date: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
    </button>
  </div>
 
  {/* Responsive Table Wrapper */}
       <div className="overflow-x-auto shadow-md rounded-xl font-bangla">
          <table className="min-w-full bg-white text-left border">
            <thead className="bg-blue-100 text-blue-900 font-semibold">
              <tr>
                <th className="py-3 px-4 border">#</th>
                <th className="py-3 px-4 border">তারিখ</th>
                <th className="py-3 px-4 border">শিরোনাম</th>
                <th className="py-3 px-4 border">ডাউনলোড</th>
              </tr>
            </thead>
            <tbody>
              {sortedNotices.map((notice, index) => (
                <tr
                  key={notice._id}
                  className="hover:bg-gray-50 transition-all duration-300"
                >
                  <td className="py-3 px-4 border">{index + 1}</td>
                  <td className="py-3 px-4 border">{notice.date}</td>
                  <td className="py-3 px-4 border">{notice.title}</td>
                  <td className="py-3 px-4 border">
                    <a
                      href={`https://islamic-studies-backend.onrender.com${notice.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                    >
                      ডাউনলোড
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
