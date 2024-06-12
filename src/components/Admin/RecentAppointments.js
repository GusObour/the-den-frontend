import React from 'react';

const RecentAppointments = ({ appointments }) => {
  return (
    <div className="p-4 bg-light-gray rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Recent Appointments</h3>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index} className="mb-2">
            {appointment.user.fullName} - {new Date(appointment.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAppointments;
