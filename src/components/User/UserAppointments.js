import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/appointments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAppointments(response.data);
      } catch (error) {
        toast.error('Failed to fetch appointments');
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/user/appointments/${appointmentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
        toast.success('Appointment canceled successfully');
      } catch (error) {
        toast.error('Failed to cancel appointment');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment._id} className="mb-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="mb-2">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="mb-2">Time: {new Date(appointment.start).toLocaleTimeString()} - {new Date(appointment.end).toLocaleTimeString()}</p>
                <p className="mb-2">Service: {appointment.service}</p>
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  className="bg-red-600 py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                >
                  Cancel Appointment
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAppointments;
