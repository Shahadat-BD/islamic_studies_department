import { useState } from "react";
import axios from "axios";

const MyResult = () => {
  const [reg, setReg] = useState("");
  const [roll, setRoll] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/results/result?registrationNumber=${reg}&classRoll=${roll}`);
      setResult(res.data);
      setError("");
    } catch (err) {
      setResult(null);
      setError("Result not found");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Check Your Result</h2>
      <div className="space-y-3 mb-4">
        <input type="text" placeholder="Registration Number" value={reg} onChange={e => setReg(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <input type="text" placeholder="Class Roll" value={roll} onChange={e => setRoll(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <button onClick={handleSearch} className="w-full bg-blue-600 text-white py-2 rounded">Search</button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {result && (
        <div className="border p-4 rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Student: {result.studentName}</h3>
          <p><strong>Reg:</strong> {result.registrationNumber} | <strong>Roll:</strong> {result.classRoll}</p>
          <p><strong>Year:</strong> {result.year} | <strong>Exam:</strong> {result.examType}</p>
          <p><strong>Published By:</strong> {result.publishedBy}</p>
          <hr className="my-2" />
          <table className="w-full text-left border mt-2">
            <thead>
              <tr>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {result.results.map((res, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{res.subject}</td>
                  <td className="border px-2 py-1">{res.marks}</td>
                  <td className="border px-2 py-1">{res.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyResult;
