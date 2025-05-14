import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllStudentInfo = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/academic-info`, {
        params: {
          search,
          year,
          page,
          limit
        }
      });
      setData(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, year, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📄 All Academic Info</h2>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or roll"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border p-2 w-full"
        />
        <select
          value={year}
          onChange={(e) => {
            setPage(1);
            setYear(e.target.value);
          }}
          className="border p-2"
        >
          <option value="">All Years</option>
          <option>Honours 1st Year</option>
          <option>Honours 2nd Year</option>
          <option>Honours 3rd Year</option>
          <option>Honours 4th Year</option>
          <option>Master's</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Class Roll</th>
              <th className="border p-2">Reg. No</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Session</th>
              <th className="border p-2">Year</th>
            </tr>
          </thead>
          <tbody>
            {data.map((info, index) => (
              <tr key={info._id}>
                <td className="border p-2">{(page - 1) * limit + index + 1}</td>
                <td className="border p-2">{info.name}</td>
                <td className="border p-2">{info.email}</td>
                <td className="border p-2">{info.classRoll}</td>
                <td className="border p-2">{info.registrationNumber}</td>
                <td className="border p-2">{info.mobileNumber}</td>
                <td className="border p-2">{info.session}</td>
                <td className="border p-2">{info.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GetAllStudentInfo;
