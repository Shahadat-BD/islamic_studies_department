import { useEffect, useState } from 'react';
import axios from 'axios';

const ShowNotice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/notices/all')
      .then(res => setNotices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📢 Public Notices</h2>
      {notices.map(notice => (
        <div key={notice._id} className="bg-gray-100 rounded p-4 mb-4 shadow">
          <h3 className="text-xl font-semibold">{notice.title}</h3>
          <p className="text-sm text-gray-600 mb-1">Date: {notice.date}</p>
          <p className="text-sm text-gray-600 mb-2">Posted By: {notice.postedBy}</p>
          {notice.file && (
            <a
              href={notice.file}
              download
              className="inline-block text-blue-600 underline"
            >
              📎 Download Attachment
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowNotice;
