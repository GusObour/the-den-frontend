import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const useAppointments = () => {
  const { auth } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/barbers/appointments?barberId=${auth.user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setAppointments(response.data.appointments);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    }
  };

  const handleCompleteAppointment = async (id) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/appointments/${id}/complete`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setAppointments(appointments.map(appointment => (appointment.id === id ? { ...appointment, status: 'Completed' } : appointment)));
      toast.success('Appointment marked as completed');
    } catch (error) {
      toast.error('Failed to complete appointment');
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setAppointments(appointments.filter(appointment => appointment.id !== id));
      toast.success('Appointment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  return {
    appointments,
    handleCompleteAppointment,
    handleDeleteAppointment
  };
};

export default useAppointments;
