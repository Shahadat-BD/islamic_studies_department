import { useState } from "react";
import axios from "axios";

const AddResultForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    registrationNumber: "",
    classRoll: "",
    department: "",
    year: "",
    examType: "",
    publishedBy: "",
    results: [{ subject: "", marks: "", grade: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResultChange = (index, e) => {
    const { name, value } = e.target;
    const updatedResults = [...formData.results];
    updatedResults[index][name] = value;
    setFormData(prev => ({ ...prev, results: updatedResults }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { subject: "", marks: "", grade: "" }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/results/add-result", formData);
      alert("Result added successfully!");
      // optionally reset form here
    } catch (err) {
      console.error(err);
      alert("Failed to submit result");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-lg my-6">
      <h2 className="text-xl font-bold mb-4 text-center">Add Student Result</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="studentName" placeholder="Student Name" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="registrationNumber" placeholder="Registration Number" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="classRoll" placeholder="Class Roll" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="year" placeholder="Year (e.g. Honours 2nd Year)" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="examType" placeholder="Exam Type (e.g. Final)" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="publishedBy" placeholder="Published By (Teacher Name)" onChange={handleChange} className="w-full border px-3 py-2 rounded" />

        <h4 className="text-lg font-medium mt-4">Subjects and Marks</h4>
        {formData.results.map((result, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <input type="text" name="subject" placeholder="Subject" value={result.subject} onChange={(e) => handleResultChange(index, e)} className="border px-2 py-1 rounded" />
            <input type="number" name="marks" placeholder="Marks" value={result.marks} onChange={(e) => handleResultChange(index, e)} className="border px-2 py-1 rounded" />
            <input type="text" name="grade" placeholder="Grade" value={result.grade} onChange={(e) => handleResultChange(index, e)} className="border px-2 py-1 rounded" />
          </div>
        ))}
        <button type="button" onClick={addSubject} className="bg-blue-600 text-white px-3 py-1 rounded mt-2">+ Add Subject</button>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4">Submit Result</button>
      </form>
    </div>
  );
};

export default AddResultForm;
