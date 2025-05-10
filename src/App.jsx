import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./Component/Navbar";
import PrivateRoute from "./Component/PrivateRoute";
import AddTeacher from "./Component/AddTeacher";
import TeacherList from "./Component/teacherList";
import EditTeacher from "./Component/EditTeacher";
import RoutineList from "./pages/routineList";
import AddRoutine from "./Component/AddRoutine";
import EditRoutine from "./Component/EditRoutine";

function App() {
  return (
   <>
     <Navbar/>

      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-teacher" element={<AddTeacher />} />
      <Route path="/teachers" element={<TeacherList />} />
      <Route path="/edit-teacher/:id" element={<EditTeacher />} />
      <Route path="/routines" element={<RoutineList />} />
      <Route path="/add-routine" element={<AddRoutine />} />
      <Route path="/edit-routine/:id" element={<EditRoutine />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
   </>
  );
}

export default App;
