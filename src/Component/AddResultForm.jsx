import { useState } from 'react';
import axios from 'axios';

export default function AddResultForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    registrationNumber: '',
    classRoll: '',
    department: '',
    year: '',
    examType: '',
    results: [{ subject: '', subjectCode: '', marks: '', gpa: '' }]
  });

  // GPA calculator function
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

      // GPA auto calculate based on marks
      if (name === 'marks') {
        const numericMarks = parseFloat(value);
        if (!isNaN(numericMarks)) {
          updatedSubjects[index].gpa = calculateGPA(numericMarks);
        } else {
          updatedSubjects[index].gpa = '';
        }
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
        {/* Student Info Inputs */}
        {[
          { label: 'Student Name', name: 'studentName' },
          { label: 'Registration Number', name: 'registrationNumber' },
          { label: 'Class Roll', name: 'classRoll' },
          { label: 'Department', name: 'department' },
          { label: 'Year', name: 'year' },
          { label: 'Exam Type', name: 'examType' }
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
            <input
              type="text"
              name={name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Subjects</h3>

        {formData.results.map((subj, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
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
                placeholder="Code"
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
                placeholder="Marks"
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
                placeholder="GPA"
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
