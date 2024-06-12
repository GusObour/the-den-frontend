import React from 'react';
import RecentAppointments from './RecentAppointments';
import UpcomingAppointments from './UpcomingAppointments';
import StatCard from './StatCard';

const AdminStats = () => {
  const stats = {
    recentAppointments: [
      { user: { fullName: 'John Doe' }, date: '2024-06-15T09:00:00Z' },
      { user: { fullName: 'Jane Smith' }, date: '2024-06-15T10:00:00Z' },
    ],
    upcomingAppointments: [
      { user: { fullName: 'Alice Johnson' }, date: '2024-06-16T09:00:00Z' },
      { user: { fullName: 'Bob Brown' }, date: '2024-06-16T10:00:00Z' },
    ],
    completedToday: 5,
    canceledToday: 2,
    earningsToday: 200.5,
    totalEarnings: 5000.75,
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6">Today's Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecentAppointments appointments={stats.recentAppointments} />
        <UpcomingAppointments appointments={stats.upcomingAppointments} />
        <StatCard title="Cuts Completed Today" value={stats.completedToday} color="bg-green-600" />
        <StatCard title="Canceled Appointments Today" value={stats.canceledToday} color="bg-red-600" />
        <StatCard title="Earnings Today" value={`$${stats.earningsToday.toFixed(2)}`} color="bg-blue-600" />
        <StatCard title="Total Earnings" value={`$${stats.totalEarnings.toFixed(2)}`} color="bg-yellow-600" />
      </div>
    </div>
  );
};

export default AdminStats;
