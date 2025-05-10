import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/teachers'; //  Backend URL

// Get all teachers
export const getAllTeachers = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error('Error fetching teachers:', err);
    return [];
  }
};

// Add a new teacher
export const addTeacher = async (teacherData) => {
  try {
    const res = await axios.post(BASE_URL, teacherData);
    return res.data;
  } catch (err) {
    console.error('Error adding teacher:', err);
    throw err;
  }
};
