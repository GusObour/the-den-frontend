import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LocationAndAbout from './components/LocationAndAbout';
import Booking from './components/Booking';
import TermsAndPrivacy from './components/TermsAndPrivacy';
// import InstagramEmbed from './components/InstagramEmbed'; // will be added in a later probably switched out with a custom gallery
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import RequestReset from './components/RequestReset';
import ResetPassword from './components/ResetPassword';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <div className="App min-h-screen flex flex-col">
          <Navbar />
          <ToastContainer />
          <main className="flex-grow">
            <Routes>
              <Route path="/admin/*" element={<ProtectedRoute element={<AdminDashboard />} adminOnly />} />
              <Route path="/user/*" element={<ProtectedRoute element={<UserDashboard />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/request-reset" element={<RequestReset />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/location" element={<LocationAndAbout />} />
              <Route path="/terms-and-privacy" element={<TermsAndPrivacy />} />
              <Route path="/" element={
                <>
                  <section id="about-section">
                    <LocationAndAbout />
                  </section>
                  <section id="booking-section">
                    <Booking />
                  </section>
                  {/* <InstagramEmbed /> */}
                </>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
