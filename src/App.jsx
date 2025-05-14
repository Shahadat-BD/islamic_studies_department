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
import AllRoutineList from "./pages/AllRoutineList";
import AllTeacherList from "./pages/AllTeacherList";
import AddAcademicInfo from "./Component/AddAcademicInfo";
import MyAcademicInfo from "./Component/MyAcademicInfo";
import Unauthorized from "./pages/Unauthorized";
import RoleBasedRoute from "./Component/RoleBasedRoute";
import AllUserInfo from "./Component/AllUserInfo";
import GetAllStudentInfo from "./Component/GetAllStudentInfo";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import AddNotice from "./Component/AddNotice";
import ShowNotice from "./pages/showNotice";

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
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/show-notice" element={<ShowNotice />} />
           
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
          <Route path="add-teacher"  
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <AddTeacher />
              </RoleBasedRoute>
            } />
          <Route path="teachers" 
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <TeacherList />
              </RoleBasedRoute>} />
         
          <Route
            path="edit-teacher/:id"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <EditTeacher />
              </RoleBasedRoute>
            }
          />
          <Route
            path="routines"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <RoutineList />
              </RoleBasedRoute>
            }
          />

      <Route
            path="add-routine"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <AddRoutine />
              </RoleBasedRoute>
            }
          />
      <Route
            path="add-notice"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <AddNotice />
              </RoleBasedRoute>
            }
          />
          <Route
            path="edit-routine/:id"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <EditRoutine />
              </RoleBasedRoute>
            }
          />
          <Route
            path="all-user"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <AllUserInfo />
              </RoleBasedRoute>
            }
          />

          <Route
            path="all-students"
            element={
              <RoleBasedRoute allowedRoles={["teacher"]}>
                <GetAllStudentInfo/>
              </RoleBasedRoute>
            }
          />

          {/* student info  */}

           <Route
            path="add-academic-info"
            element={
              <RoleBasedRoute allowedRoles={["student"]}>
                <AddAcademicInfo />
              </RoleBasedRoute>
            }
          />
          <Route
            path="my-academic-info"
            element={
              <RoleBasedRoute allowedRoles={["student"]}>
                <MyAcademicInfo />
              </RoleBasedRoute>
            }
          />

        
          
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
