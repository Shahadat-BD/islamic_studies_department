import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Navbar from "./Component/Navbar";
import PrivateRoute from "./Component/PrivateRoute";

// Dashboard Layout and Pages
import DashboardLayout from "./Layout/DashboardLayout";
import AddTeacher from "./Component/AddTeacher";
import TeacherList from "./Component/teacherList";
import EditTeacher from "./Component/EditTeacher";
import RoutineList from "./pages/routineList";
import AddRoutine from "./Component/AddRoutine";
import EditRoutine from "./Component/EditRoutine";
import DashboardHome from "./pages/dashboard/DashboardHome"; 
import AllRoutineList from "./pages/AllRoutineList";
import AllTeacherList from "./pages/AllTeacherList";
import AddAcademicInfo from "./Component/AddAcademicInfo";
import MyAcademicInfo from "./Component/MyAcademicInfo";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-teacher-list" element={<AllTeacherList />} />
        <Route path="/all-routine-list" element={<AllRoutineList />} />
           
        {/* Protected Dashboard & Nested Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Nested inside /dashboard */}
          <Route index element={<DashboardHome />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="edit-teacher/:id" element={<EditTeacher />} />
          <Route path="add-routine" element={<AddRoutine />} />
          <Route path="routines" element={<RoutineList />} />
          <Route path="edit-routine/:id" element={<EditRoutine />} />
          {/* student info  */}
          <Route path="add-academic-info" element={<AddAcademicInfo />} />
          <Route path="my-academic-info" element={<MyAcademicInfo />} />
          
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
