import React from "react";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyFreelancer from "./Pages/ApplyFreelancerNew.js";
import Notification from "./Pages/Notification";
import { UserList } from "./Pages/Admin/UserListNew.js";
import FreeLancerList from "./Pages/Admin/FreeLancerListNew.js";
import Profile from "./Pages/Freelancer/Profile";
import { BookAppointment } from "./Pages/BookAppointment";
import Appointments from "./Pages/AppointmentsNew.js";
import FreelancerAppointment from './Pages/Freelancer/FreelancerAppointment'

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/apply-freelancer"
          element={
            <ProtectedRoute>
              <ApplyFreelancer />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/usersList"
          element={
            <ProtectedRoute>
              <UserList></UserList>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/freelancersList"
          element={
            <ProtectedRoute>
              <FreeLancerList></FreeLancerList>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/freelancer/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/book-appointment/:freelancerId"
          element={
            <ProtectedRoute>
              <BookAppointment></BookAppointment>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments></Appointments>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/freelancer/appointments"
          element={
            <ProtectedRoute>
              <FreelancerAppointment></FreelancerAppointment>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;