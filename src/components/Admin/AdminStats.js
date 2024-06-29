import React, { useState, useEffect, useContext } from 'react';
import AppointmentCard from './AppointmentCard';
import StatCard from './StatCard';
import AppointmentService from '../../services/AppointmentService';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminStats = () => {
  const { auth } = useContext(AuthContext);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [stats, setStats] = useState({
    completedToday: 0,
    canceledToday: 0,
    earningsToday: 0,
    totalEarnings: 0,
  });
  const service = new AppointmentService(process.env.REACT_APP_API_BASE_URL, localStorage.getItem('token'));


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await service.fetchAppointments(auth.user._id, auth.user.admin);
        setUpcomingAppointments(data.filter(a => new Date(a.start) >= new Date() && a.status === "Booked"));
      } catch (error) {
        toast.error('Failed to fetch appointments');
      }
    };

    fetchAppointments();
    const intervalId = setInterval(fetchAppointments, 60000);
    return () => clearInterval(intervalId);
  }, [auth.user]);

  const handleComplete = async (appointmentId) => {
    const service = new AppointmentService(process.env.REACT_APP_API_BASE_URL, localStorage.getItem('token'));
    try {
      await service.completeAppointment(appointmentId);
      toast.success('Appointment completed successfully');
      setUpcomingAppointments(prevAppointments => prevAppointments.map(appointment =>
        appointment.id === appointmentId ? { ...appointment, status: 'Completed' } : appointment
      ));
    } catch (error) {
      toast.error('Failed to complete appointment');
    }
  };

  const handleDelete = async (appointmentId) => {
    const service = new AppointmentService(process.env.REACT_APP_API_BASE_URL, localStorage.getItem('token'));
    try {
      await service.deleteAppointment(appointmentId);
      toast.success('Appointment canceled successfully');
      setUpcomingAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const fetchStats = async () => {
    try {
      const [completedToday, canceledToday, earningsToday, totalEarnings] = await Promise.all([
        service.getCompletedAppointments(),
        service.getTodaysCanceledAppointments(),
        service.getTodaysEarnings(),
        service.getTotalWeekEarnings()
      ]);

      setStats({
        completedToday,
        canceledToday,
        earningsToday,
        totalEarnings
      });
    } catch (error) {
      toast.error('Failed to fetch stats');
    }
  }

  useEffect(() => {
    fetchStats();
    const intervalId = setInterval(fetchStats, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6">Today's Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-light-gray rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Upcoming Appointments</h3>
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onComplete={() => handleComplete(appointment._id)}
              onCancel={() => handleDelete(appointment._id)}
            />
          ))}
        </div>
        <StatCard title="Cuts Completed Today" value={stats.completedToday} color="bg-green-600" />
        <StatCard title="Canceled Appointments Today" value={stats.canceledToday} color="bg-red-600" />
        <StatCard title="Earnings Today" value={`$${stats.earningsToday.toFixed(2)}`} color="bg-blue-600" />
        <StatCard title="Total Earnings" value={`$${stats.totalEarnings.toFixed(2)}`} color="bg-yellow-600" />
      </div>
    </div>
  );
};

export default AdminStats;
