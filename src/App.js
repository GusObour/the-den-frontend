import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LocationAndAbout from './components/LocationAndAbout';
import Booking from './components/Booking';
import InstagramEmbed from './components/InstagramEmbed';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import Appointments from './components/Admin/Appointments';
import Availability from './components/Admin/Availability';
import AdminStats from './components/Admin/AdminStats';
import Settings from './components/Settings';
import UserDashboard from './components/UserDashboard';
import UserAppointments from './components/User/UserAppointments';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
    return (
      <AuthContextProvider>
        <Router>
          <div className="App">
            <Navbar />
            <ToastContainer />
            <Routes>
                
              <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
                <Route path="stats" element={<AdminStats />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="availability" element={<Availability />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/user/*" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}>
                <Route path="appointments" element={<UserAppointments />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/location" element={<LocationAndAbout />} />
              <Route path="/" element={
                <main>
                  <section id="about-section">
                    <LocationAndAbout />
                  </section>
                  <section id="booking-section">
                    <Booking />
                  </section>
                  <InstagramEmbed />
                </main>
              } />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthContextProvider>
    );
  }
  
  export default App;