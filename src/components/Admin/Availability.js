import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaCalendarPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import BulkAvailabilityForm from './BulkAvailabilityForm';
import { AuthContext } from '../../context/AuthContext';
import AvailabilityList from './AvailabilityList';
import AvailabilityForm from './AvailabilityForm';
import AvailabilityService from '../../services/AvailabilityService';

Modal.setAppElement('#root');

const Availability = () => {
  const { auth } = useContext(AuthContext);
  const [availabilities, setAvailabilities] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isBulkAdding, setIsBulkAdding] = useState(false);
  const [currentAvailability, setCurrentAvailability] = useState(null);

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

  const handleAddOrEditAvailability = async (e, isEdit) => {
    e.preventDefault();
    try {
      const response = isEdit
        ? await AvailabilityService.updateAvailability(currentAvailability._id, currentAvailability)
        : await AvailabilityService.addAvailability(currentAvailability);

      const updatedAvailabilities = isEdit
        ? availabilities.map((availability) =>
            availability._id === currentAvailability._id ? response : availability
          )
        : [...availabilities, response];

      setAvailabilities(updatedAvailabilities);
      setModalIsOpen(false);
      toast.success(`Availability ${isEdit ? 'updated' : 'added'} successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteAvailability = async (id) => {
    try {
      await AvailabilityService.deleteAvailability(id);
      setAvailabilities(availabilities.filter((availability) => availability._id !== id));
      toast.success('Availability deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEditModal = (availability) => {
    setIsEditing(true);
    setIsBulkAdding(false);
    setCurrentAvailability({
      ...availability,
      date: availability.date.split('T')[0],
      start: availability.start.split('T')[1].substring(0, 5),
      end: availability.end.split('T')[1].substring(0, 5),
    });
    setModalIsOpen(true);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setIsBulkAdding(false);
    setCurrentAvailability({
      barber: auth.user.fullName,
      date: '',
      start: '',
      end: '',
    });
    setModalIsOpen(true);
  };

  const openBulkAddModal = () => {
    setIsEditing(false);
    setIsBulkAdding(true);
    setModalIsOpen(true);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Availability</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <button
          onClick={openBulkAddModal}
          className="bg-green-500 flex items-center justify-center text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
        >
          <FaCalendarPlus className="mr-2" /> Add Bulk Availability
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
          {isEditing ? 'Edit Availability' : isBulkAdding ? 'Add Bulk Availability' : 'Add Availability'}
        </h2>
        {isBulkAdding ? (
          <BulkAvailabilityForm barberId={auth.user._id} />
        ) : (
          <AvailabilityForm
            isEditing={isEditing}
            currentAvailability={currentAvailability}
            onChange={setCurrentAvailability}
            onSubmit={(e) => handleAddOrEditAvailability(e, isEditing)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Availability;
