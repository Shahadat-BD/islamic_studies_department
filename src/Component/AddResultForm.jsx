import { useState } from 'react';
import axios from 'axios';

export default function AddResultForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    registrationNumber: '',
    classRoll: '',
    department: 'Arabic & Islamic Studies', // Default value
    year: '',
    examType: '',
    results: [{ subject: '', subjectCode: '', marks: '', gpa: '' }]
  });

  const calculateGPA = (marks) => {
    if (marks >= 80) return 4.00;
    if (marks >= 75) return 3.75;
    if (marks >= 70) return 3.50;
    if (marks >= 65) return 3.25;
    if (marks >= 60) return 3.00;
    if (marks >= 55) return 2.75;
    if (marks >= 50) return 2.50;
    if (marks >= 45) return 2.25;
    if (marks >= 40) return 2.00;
    if (marks >= 33) return 1.00;
    return 0.00;
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedSubjects = [...formData.results];
      updatedSubjects[index][name] = value;

      if (name === 'marks') {
        const numericMarks = parseFloat(value);
        updatedSubjects[index].gpa = !isNaN(numericMarks) ? calculateGPA(numericMarks) : '';
      }

      setFormData({ ...formData, results: updatedSubjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      results: [...formData.results, { subject: '', subjectCode: '', marks: '', gpa: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/results/add-result', formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to submit result.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-xl space-y-6">

      <h2 className="text-2xl font-bold text-gray-700 border-b pb-2 mb-4">Student Result Submission</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Student Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Student Name</label>
          <input
            type="text"
            name="studentName"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Registration Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Class Roll */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Class Roll</label>
          <input
            type="text"
            name="classRoll"
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Department Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="Arabic & Islamic Studies">Arabic & Islamic Studies</option>
          </select>
        </div>

        {/* Year Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Year</option>
            <option value="Honours 1st Year">Honours 1st Year</option>
            <option value="Honours 2nd Year">Honours 2nd Year</option>
            <option value="Honours 3rd Year">Honours 3rd Year</option>
            <option value="Honours 4th Year">Honours 4th Year</option>
            <option value="Master's">Master's</option>
          </select>
        </div>

        {/* Exam Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Exam Type</label>
          <select
            name="examType"
            value={formData.examType}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Exam Type</option>
            <option value="Assessment Test">Assessment Test</option>
            <option value="In Course">In Course</option>
          </select>
        </div>
      </div>

      {/* Subject Inputs */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Subjects</h3>

        {formData.results.map((subj, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={subj.subject}
                onChange={(e) => handleChange(e, i)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Code</label>
              <input
                type="text"
                name="subjectCode"
                value={subj.subjectCode}
                onChange={(e) => handleChange(e, i)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Marks</label>
              <input
                type="number"
                name="marks"
                value={subj.marks}
                onChange={(e) => handleChange(e, i)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">GPA</label>
              <input
                type="number"
                name="gpa"
                value={subj.gpa}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSubject}
          className="mt-2 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Add Subject
        </button>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Result
        </button>
      </div>
    </form>
  );
}
