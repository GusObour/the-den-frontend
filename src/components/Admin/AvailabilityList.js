import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AvailabilityList = ({ availabilities, onEdit, onDelete }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {availabilities.map((availability) => (
        <div key={availability._id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <p className="mb-1">
            <strong>Date:</strong>{' '}
            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC', hour12: true }).format(
              new Date(availability.date)
            )}
          </p>
          <p className="mb-1">
            <strong>Start Time:</strong>{' '}
            {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true }).format(
              new Date(availability.start)
            )}
          </p>
          <p className="mb-1">
            <strong>End Time:</strong>{' '}
            {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true }).format(
              new Date(availability.end)
            )}
          </p>
          <div className="flex items-center justify-between space-x-2 mt-4">
            <button
              onClick={() => onEdit(availability)}
              className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition duration-200 w-full"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={() => onDelete(availability._id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 w-full"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailabilityList;
