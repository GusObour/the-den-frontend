import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      _id: '1',
      date: '2024-06-15T00:00:00Z',
      start: '2024-06-15T09:00:00Z',
      end: '2024-06-15T10:00:00Z',
      user: {
        _id: '1',
        fullName: 'John Doe'
      },
      barber: {
        _id: '2',
        fullName: 'Jane Smith'
      },
      service: 'Haircut',
      status: 'Pending',
      notes: 'No special instructions'
    }
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    start: '',
    end: '',
    user: '',
    barber: '',
    service: '',
    status: 'Pending',
    notes: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/appointments`);
      setAppointments(response.data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/appointments`, newAppointment);
      setAppointments([...appointments, response.data]);
      setModalIsOpen(false);
      toast.success('Appointment added successfully');
    } catch (error) {
      toast.error('Failed to add appointment');
    }
  };

  const handleEditAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/appointments/${currentAppointmentId}`, newAppointment);
      setAppointments(appointments.map(appointment => (appointment._id === currentAppointmentId ? response.data : appointment)));
      setModalIsOpen(false);
      toast.success('Appointment updated successfully');
      setIsEditing(false);
      setCurrentAppointmentId(null);
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/appointments/${id}`);
      setAppointments(appointments.filter(appointment => appointment._id !== id));
      toast.success('Appointment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  const openEditModal = (appointment) => {
    setIsEditing(true);
    setCurrentAppointmentId(appointment._id);
    setNewAppointment({
      date: appointment.date.split('T')[0],
      start: appointment.start.split('T')[1].substring(0, 5),
      end: appointment.end.split('T')[1].substring(0, 5),
      user: appointment.user._id,
      barber: appointment.barber._id,
      service: appointment.service,
      status: appointment.status,
      notes: appointment.notes
    });
    setModalIsOpen(true);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setNewAppointment({
      date: '',
      start: '',
      end: '',
      user: '',
      barber: '',
      service: '',
      status: 'Pending',
      notes: ''
    });
    setModalIsOpen(true);
  };

  return (
    <div className="bg-black-3 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6">Manage Appointments</h2>
      <button onClick={openAddModal} className="bg-blue flex items-center text-white py-2 px-4 rounded hover:bg-light-blue transition duration-200 mb-6">
        <FaPlus className="mr-2" /> Add Appointment
      </button>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Barber</th>
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="border px-4 py-2">{new Date(appointment.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(appointment.start).toLocaleTimeString()}</td>
              <td className="border px-4 py-2">{new Date(appointment.end).toLocaleTimeString()}</td>
              <td className="border px-4 py-2">{appointment.user.fullName}</td>
              <td className="border px-4 py-2">{appointment.barber.fullName}</td>
              <td className="border px-4 py-2">{appointment.service}</td>
              <td className="border px-4 py-2">{appointment.status}</td>
              <td className="border px-4 py-2 flex items-center space-x-2">
                <button onClick={() => openEditModal(appointment)} className="text-green-500 hover:text-green-700">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteAppointment(appointment._id)} className="text-red-500 hover:text-red-700">
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
        className="Modal__Content bg-black-3 p-6 rounded-lg shadow-lg text-white max-w-lg mx-auto my-20 w-full sm:max-w-xl lg:max-w-2xl"
        overlayClassName="Modal__Overlay fixed inset-0 bg-black-2 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Appointment' : 'Add Appointment'}</h2>
        <form onSubmit={isEditing ? handleEditAppointment : handleAddAppointment} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={newAppointment.date}
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
              value={newAppointment.start}
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
              value={newAppointment.end}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">User ID</label>
            <input
              type="text"
              name="user"
              value={newAppointment.user}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Barber ID</label>
            <input
              type="text"
              name="barber"
              value={newAppointment.barber}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Service</label>
            <input
              type="text"
              name="service"
              value={newAppointment.service}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Status</label>
            <select
              name="status"
              value={newAppointment.status}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Booked">Booked</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Notes</label>
            <textarea
              name="notes"
              value={newAppointment.notes}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>
          <button type="submit" className="bg-green-600 flex items-center justify-center text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 w-full">
            <FaPlus className="mr-2" /> {isEditing ? 'Update Appointment' : 'Add Appointment'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Appointments;
