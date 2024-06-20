import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AvailabilityForm = ({ isEditing, currentAvailability, onChange, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2">Barber</label>
        <input
          type="text"
          name="barber"
          value={currentAvailability.barber.fullName}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={currentAvailability.date}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">Start Time</label>
        <input
          type="time"
          name="start"
          value={currentAvailability.start}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-2">End Time</label>
        <input
          type="time"
          name="end"
          value={currentAvailability.end}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button type="submit" className="bg-green-600 flex items-center justify-center text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 w-full">
        <FaPlus className="mr-2" /> {isEditing ? 'Update Availability' : 'Add Availability'}
      </button>
    </form>
  );
};

export default AvailabilityForm;
