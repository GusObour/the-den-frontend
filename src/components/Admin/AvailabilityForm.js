import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CombinedAvailabilityForm = ({ isEditing, currentAvailability, onChange, onSubmit }) => {
  const [blockType, setBlockType] = useState(currentAvailability.blockType || 'none');
  const [interval, setInterval] = useState(currentAvailability.interval || '1');
  const [recurringType, setRecurringType] = useState(currentAvailability.recurringType || 'none');

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...currentAvailability, [name]: value });
  };

  const handleBlockTypeChange = (e) => {
    const blockTypeValue = e.target.value;
    setBlockType(blockTypeValue);
    onChange({ ...currentAvailability, blockType: blockTypeValue });
  };

  const handleRecurringTypeChange = (e) => {
    const recurringTypeValue = e.target.value;
    setRecurringType(recurringTypeValue);
    onChange({ ...currentAvailability, recurringType: recurringTypeValue });
  };

  const handleIntervalChange = (e) => {
    const intervalValue = e.target.value;
    setInterval(intervalValue);
    onChange({ ...currentAvailability, interval: intervalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(currentAvailability);
      toast.success(`Availability ${isEditing ? 'updated' : 'added'} successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="blockType">
          Block Type
          <span className="text-gray-400 text-xs"> (Days you are not available)</span>
        </label>
        <select
          name="blockType"
          id="blockType"
          value={blockType}
          onChange={handleBlockTypeChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="none">None</option>
          <option value="block">Block Off Days</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="recurringType">
          Recurring Type
          <span className="text-gray-400 text-xs"> (Bulk add availability)</span>
        </label>
        <select
          name="recurringType"
          id="recurringType"
          value={recurringType}
          onChange={handleRecurringTypeChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={currentAvailability.startDate || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      {(recurringType !== 'none' || blockType !== 'none') && (
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={currentAvailability.endDate || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="start">Start Time</label>
        <input
          type="time"
          name="start"
          id="start"
          value={currentAvailability.start || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="end">End Time</label>
        <input
          type="time"
          name="end"
          id="end"
          value={currentAvailability.end || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {blockType === 'block' && (
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="reason">Reason</label>
          <input
            type="text"
            name="reason"
            id="reason"
            value={currentAvailability.reason || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      {recurringType !== 'none' && (
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="interval">
            Interval (hours)
            <span className="text-gray-400 text-xs"> (Time between availability slots)</span>
          </label>
          <select
            name="interval"
            id="interval"
            value={interval}
            onChange={handleIntervalChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            {/* Add more intervals as needed */}
          </select>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditing ? 'Update' : 'Add'} Availability
        </button>
      </div>
    </form>
  );
};

export default CombinedAvailabilityForm;
