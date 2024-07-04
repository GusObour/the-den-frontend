import React from 'react';
import { FaEdit, FaTrash, FaUnlock } from 'react-icons/fa';

const formatDateTime = (dateTime, options) => {
  try {
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTime));
  } catch (error) {
    console.error('Error formatting dateTime:', dateTime, error);
    return 'Invalid time';
  }
};

const AvailabilityList = ({ availabilities, selectedAvailabilities, setSelectedAvailabilities, onEdit, onDelete }) => {
  const toggleSelectAvailability = (id) => {
    if (selectedAvailabilities.includes(id)) {
      setSelectedAvailabilities(selectedAvailabilities.filter((availabilityId) => availabilityId !== id));
    } else {
      setSelectedAvailabilities([...selectedAvailabilities, id]);
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {availabilities.map((availability) => (
        <div
          key={availability._id}
          className={`bg-gray-900 p-4 rounded-lg shadow-lg ${availability.blocked ? 'opacity-50' : ''}`}
        >
          <div className="flex items-center justify-between mb-2">
            <input
              type="checkbox"
              checked={selectedAvailabilities.includes(availability._id)}
              onChange={() => toggleSelectAvailability(availability._id)}
              className="form-checkbox text-blue-600"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(availability)}
                className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(availability._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <p className="mb-1">
            <strong>Date:</strong>{' '}
            {formatDateTime(availability.date, { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC', hour12: true })}
          </p>
          <p className="mb-1">
            <strong>Start Time:</strong>{' '}
            {formatDateTime(availability.start, { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true })}
          </p>
          <p className="mb-1">
            <strong>End Time:</strong>{' '}
            {formatDateTime(availability.end, { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: true })}
          </p>
          {availability.blocked ? (
            <p className="mb-1 text-red-500">
              <strong>Blocked</strong>
            </p>
          ) : (
            <p className="mb-1 text-green-500">
              <strong>Available</strong>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvailabilityList;
