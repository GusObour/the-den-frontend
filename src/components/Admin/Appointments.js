import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaCheck, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import useAppointments from "../hooks/useAppointments";
import AppointmentService from "../../services/AppointmentService";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { auth } = useContext(AuthContext);

  const service = new AppointmentService();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const fetchAppointments = await service.fetchAppointments(
          auth.user._id,
          auth.user.admin
        );
        setAppointments(fetchAppointments);
      } catch (error) {
        toast.error("Failed to fetch appointments");
      }
    };

    fetchAppointments();

  }, [auth.user._id, auth.user.admin]);

  async function handleCompleteAppointment(id) {
    try {
      const response = await service.completeAppointment(id, auth.user._id);
      const results = response.data;
  
      if (results.success) {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: "Completed" } : appointment
        );
        setAppointments(updatedAppointments);
        toast.success("Appointment completed successfully");
      } else {
        toast.error(results.message);
      }
    } catch (error) {
      console.error('Failed to complete appointment:', error);
      toast.error("Failed to complete appointment");
    }
  }

  async function handleDeleteAppointment(id) {
    try {
      const response = await service.cancelAppointment(id, auth.user._id, auth.user.admin);
      const results = response.data;
  
      if (results.success) {
        setAppointments(appointments.filter((appointment) => appointment._id !== id));
        toast.success("Appointment canceled successfully");
      } else {
        toast.error(results.message);
      }
    } catch (error) {
      console.error('Failed to delete appointment:', error);
      toast.error("Failed to delete appointment");
    }
  }
  

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">Manage Appointments</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-gray-900 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">{appointment.service}</h3>
            <p className="mb-1">
              <strong>Date:</strong>{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                timeZone: "UTC",
                hour12: true,
              }).format(new Date(appointment.date))}
            </p>
            <p className="mb-1">
              <strong>Start Time:</strong>{" "}
              {new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
                hour12: true,
              }).format(new Date(appointment.start))}
            </p>
            <p className="mb-1">
              <strong>End Time:</strong>{" "}
              {new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
                hour12: true,
              }).format(new Date(appointment.end))}
            </p>
            <p className="mb-1">
              <strong>User:</strong> {appointment.user.fullName}
            </p>
            <p className="mb-1">
              <strong>Barber:</strong> {appointment.barber.fullName}
            </p>
            <p className="mb-1">
              <strong>Status:</strong> {appointment.status}
            </p>
            <div className="flex items-center justify-end space-x-2 mt-4">
              {appointment.status === "Booked" && (
                <>
                  <button
                    onClick={() => handleCompleteAppointment(appointment._id)}
                    className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-600 transition duration-200 w-full"
                  >
                    <FaCheck className="mr-2" /> Complete
                  </button>
                  <button
                    onClick={() => handleDeleteAppointment(appointment._id)}
                    className="bg-red-700 text-black py-2 px-4 rounded hover:bg-red-600 transition duration-200 w-full"
                  >
                    <FaTrash className="mr-2" /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
