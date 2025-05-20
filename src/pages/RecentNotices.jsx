import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const RecentNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notices")
      .then((res) => {
        setNotices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notices:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-20 font-semibold">Loading notices...</p>;
  }

  if (notices.length === 0) {
    return <p className="text-center py-20 font-semibold">No notices found.</p>;
  }

  const sortedNotices = [...notices]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10 lg:px-16 font-bangla">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            📢 সাম্প্রতিক নোটিশ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            সর্বশেষ ৩টি গুরুত্বপূর্ণ নোটিশ নিচে টেবিল আকারে দেখানো হলো।
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-md rounded-xl" data-aos="fade-up">
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
                      href={`http://localhost:5000${notice.fileUrl}`}
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

        {/* View All Button */}
        <div className="text-center mt-8" data-aos="fade-up">
          <a
            href="/show-notice"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            সকল নোটিশ দেখুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentNotices;

