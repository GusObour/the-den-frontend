import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

const Availability = () => {
  const [availabilities, setAvailabilities] = useState([
    {
      _id: '1',
      barber: 'Barber1',
      date: '2024-06-15T00:00:00Z',
      start: '2024-06-15T09:00:00Z',
      end: '2024-06-15T17:00:00Z'
    }
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAvailabilityId, setCurrentAvailabilityId] = useState(null);
  const [newAvailability, setNewAvailability] = useState({
    barber: '',
    date: '',
    start: '',
    end: ''
  });

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/availabilities`);
      setAvailabilities(response.data);
    } catch (error) {
      toast.error('Failed to fetch availabilities');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability({ ...newAvailability, [name]: value });
  };

  const handleAddAvailability = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/availabilities`, newAvailability);
      setAvailabilities([...availabilities, response.data]);
      setModalIsOpen(false);
      toast.success('Availability added successfully');
    } catch (error) {
      toast.error('Failed to add availability');
    }
  };

  const handleEditAvailability = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/availabilities/${currentAvailabilityId}`, newAvailability);
      setAvailabilities(availabilities.map(availability => (availability._id === currentAvailabilityId ? response.data : availability)));
      setModalIsOpen(false);
      toast.success('Availability updated successfully');
      setIsEditing(false);
      setCurrentAvailabilityId(null);
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  const handleDeleteAvailability = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/availabilities/${id}`);
      setAvailabilities(availabilities.filter(availability => availability._id !== id));
      toast.success('Availability deleted successfully');
    } catch (error) {
      toast.error('Failed to delete availability');
    }
  };

  const openEditModal = (availability) => {
    setIsEditing(true);
    setCurrentAvailabilityId(availability._id);
    setNewAvailability({
      barber: availability.barber,
      date: availability.date.split('T')[0],
      start: availability.start.split('T')[1].substring(0, 5),
      end: availability.end.split('T')[1].substring(0, 5)
    });
    setModalIsOpen(true);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setNewAvailability({
      barber: '',
      date: '',
      start: '',
      end: ''
    });
    setModalIsOpen(true);
  };

  return (
    <div className="bg-black-3 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6">Manage Availability</h2>
      <button onClick={openAddModal} className="bg-blue flex items-center text-white py-2 px-4 rounded hover:bg-light-blue transition duration-200 mb-6">
        <FaPlus className="mr-2" /> Add Availability
      </button>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map((availability) => (
            <tr key={availability._id}>
              <td className="border px-4 py-2">{new Date(availability.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(availability.start).toLocaleTimeString()}</td>
              <td className="border px-4 py-2">{new Date(availability.end).toLocaleTimeString()}</td>
              <td className="border px-4 py-2 flex items-center space-x-2">
                <button onClick={() => openEditModal(availability)} className="text-green-500 hover:text-green-700">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteAvailability(availability._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-black-3 p-6 rounded-lg shadow-lg text-white max-w-lg mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black-2 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Availability' : 'Add Availability'}</h2>
        <form onSubmit={isEditing ? handleEditAvailability : handleAddAvailability} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Barber ID</label>
            <input
              type="text"
              name="barber"
              value={newAvailability.barber}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={newAvailability.date}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Start Time</label>
            <input
              type="time"
              name="start"
              value={newAvailability.start}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">End Time</label>
            <input
              type="time"
              name="end"
              value={newAvailability.end}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <button type="submit" className="bg-green-600 flex items-center justify-center text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 w-full">
            <FaPlus className="mr-2" /> {isEditing ? 'Update Availability' : 'Add Availability'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Availability;
