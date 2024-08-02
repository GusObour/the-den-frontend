import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from '../../context/AuthContext';
import AppointmentService from '../../services/AppointmentService';
const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const { auth } = useContext(AuthContext);

  const service = new AppointmentService();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointments = await service.fetchAppointments(auth.user._id, auth.user.admin);
        if (appointments.length === 0) {
          toast.success('You have no appointments');
        }
        setAppointments(appointments);
      } catch (error) {
        toast.error('Failed to fetch appointments');
      }
    };

    fetchAppointments();
  }, [auth.user._id, auth.user.admin]);

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setLoadingStates(prevStates => ({ ...prevStates, [appointmentId]: true }));
      try {
        const results = await service.cancelAppointment(appointmentId, auth.user._id, auth.user.admin);
        if (results.success) {
          setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== appointmentId));
          toast.success(results.message);
        } else {
          toast.error(results.message);
        }
      } catch (error) {
        toast.error('Failed to cancel appointment');
      } finally {
        setLoadingStates(prevStates => ({ ...prevStates, [appointmentId]: false }));
      }
    }
  };




  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment._id} className="mb-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="mb-1"><strong>Date:</strong> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC', hour12: true }).format(new Date(appointment.date))}</p>
                <p className="mb-1"><strong>Start Time:</strong> {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true }).format(new Date(appointment.start))}</p>
                <p className="mb-1"><strong>End Time:</strong> {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true }).format(new Date(appointment.end))}</p>
                <p className="mb-2">Service: {appointment.service}</p>
                <p className='mb-2'><strong>Status:</strong> {appointment.status}</p>
                {appointment.status === 'Booked' ? (
                  <button
                    onClick={() => handleCancelAppointment(appointment._id)}
                    className="bg-red-600 py-2 px-4 rounded hover:bg-red-700 transition duration-200 flex items-center justify-center"
                    disabled={loadingStates[appointment._id]}
                  >
                    {loadingStates[appointment._id] ? (
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                    ) : (
                      'Cancel Appointment'
                    )}
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

      )}
    </div>
  );
};

export default UserAppointments;
