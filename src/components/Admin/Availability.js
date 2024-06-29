import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { AuthContext } from '../../context/AuthContext';
import AvailabilityList from './AvailabilityList';
import CombinedAvailabilityForm from './AvailabilityForm';
import AvailabilityService from '../../services/AvailabilityService';

Modal.setAppElement('#root');

const Availability = () => {
  const { auth } = useContext(AuthContext);
  const [availabilities, setAvailabilities] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAvailability, setCurrentAvailability] = useState({
    blockType: 'none',
    startDate: '',
    endDate: '',
    start: '',
    end: '',
    reason: '',
    interval: '1',
    recurringType: 'none',
  });

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const availabilityData = await AvailabilityService.fetchAvailabilities(auth.user._id);
      setAvailabilities(availabilityData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddOrEditAvailability = async (availability) => {
    if (isEditing) {
      await AvailabilityService.updateAvailability(availability._id, availability);
      setAvailabilities((prev) =>
        prev.map((item) => (item._id === availability._id ? availability : item))
      );
    } else {
      const newAvailability = await AvailabilityService.addAvailability(availability);
      setAvailabilities((prev) => [...prev, newAvailability]);
    }
    setModalIsOpen(false);
  };

  const handleDeleteAvailability = async (id) => {
    try {
      await AvailabilityService.deleteAvailability(id);
      setAvailabilities((prev) => prev.filter((item) => item._id !== id));
      toast.success('Availability deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEditModal = (availability) => {
    setIsEditing(true);
    setCurrentAvailability({
      ...availability,
      blockType: availability.blockType || 'none',
      startDate: availability.date.split('T')[0],
      start: availability.start.split('T')[1].substring(0, 5),
      end: availability.end.split('T')[1].substring(0, 5),
      interval: availability.interval || '1',
      recurringType: availability.recurringType || 'none',
    });
    setModalIsOpen(true);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentAvailability({
      blockType: 'none',
      startDate: '',
      endDate: '',
      start: '',
      end: '',
      reason: '',
      interval: '1',
      recurringType: 'none',
    });
    setModalIsOpen(true);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Availability</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <button
          onClick={openAddModal}
          className="bg-blue-500 flex items-center justify-center text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          <FaPlus className="mr-2" /> Add Availability
        </button>
      </div>
      <AvailabilityList
        availabilities={availabilities}
        onEdit={openEditModal}
        onDelete={handleDeleteAvailability}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-lg mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Availability' : 'Add Availability'}
        </h2>
        <CombinedAvailabilityForm
          isEditing={isEditing}
          currentAvailability={currentAvailability}
          onChange={setCurrentAvailability}
          onSubmit={handleAddOrEditAvailability}
        />
      </Modal>
    </div>
  );
};

export default Availability;
