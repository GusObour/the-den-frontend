import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AppointmentCard = ({ appointment, onComplete, onCancel, isLoading }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <p className="mb-1"><strong>User:</strong> {appointment.user.fullName}</p>
      <p className="mb-1"><strong>Date:</strong> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC', hour12: true }).format(new Date(appointment.start))}</p>
      <p className="mb-1"><strong>Start Time:</strong> {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true }).format(new Date(appointment.start))}</p>
      <p className="mb-1"><strong>End Time:</strong> {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true }).format(new Date(appointment.end))}</p>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={onComplete}
          className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-600 transition duration-200 w-full flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : (
            <>
              <FaCheck className="mr-2" /> Complete
            </>
          )}
        </button>
        <button
          onClick={onCancel}
          className="bg-red-700 text-black py-2 px-4 rounded hover:bg-red-600 transition duration-200 w-full flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : (
            <>
              <FaTimes className="mr-2" /> Cancel
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
