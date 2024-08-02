import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingService from "../services/BookingService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../context/AxiosInterceptors";
import moment from "moment";

const formatDateTime = (dateTime, format) => {
  try {
    const returnedDate = moment.utc(dateTime).format(format);
    return returnedDate;
  } catch (error) {
    console.error("Error formatting dateTime:", dateTime, error);
    return "Invalid time";
  }
};

const Booking = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isBookingLoading, setIsBookingLoading] = useState(false);
    useEffect(() => {
        const fetchServicesAndBarbers = async () => {
            const fetchedServices = await BookingService.fetchServices();
            setServices(fetchedServices);
            const fetchedBarbers = await BookingService.fetchBarbers();
            setBarbers(fetchedBarbers);
        };

    fetchServicesAndBarbers();

    BookingService.connectSocket(handleWebSocketMessage);

    return () => {
      BookingService.disconnectSocket();
    };
  }, []);

  const handleWebSocketMessage = (data) => {
    if (data.action === "locked") {
      toast.success(
        "Appointment slot locked! You can now proceed with the booking."
      );
    } else if (data.action === "unavailable") {
      toast.error("The selected appointment slot is no longer available.");
      setCurrentStep(1);
      setSelectedService(null);
      setSelectedBarber(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } else if (data.action === "lock_limit_reached") {
      toast.error(`Lock limit reached. Please try again later.`);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentStep(2);
  };

  const handleBarberSelect = async (barber) => {
    setSelectedBarber(barber);
    setSelectedDate(null);
    setSelectedTime(null);

    if (barber && barber.id) {
      const fetchedDates = await BookingService.fetchAvailabilityDates(
        barber.id
      );
      if (fetchedDates.length === 0) {
        toast.error("No availability  for the selected barber");
        setCurrentStep(1);
        setSelectedService(null);
        setSelectedBarber(null);
        setSelectedDate(null);
        setSelectedTime(null);
      } else {
        setAvailableDates(fetchedDates);
        setCurrentStep(3);
      }
    }
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    if (selectedBarber && selectedBarber.id) {
      if (!auth.isLoggedIn) {
        toast.error("You must be logged in to continue booking an appointment");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
      const fetchedTimeSlots = await BookingService.fetchAvailability(
        selectedBarber.id,
        date,
        auth.user._id
      );
      setTimeSlots(fetchedTimeSlots);
      setCurrentStep(4);
    } else {
      console.error("No barber selected");
    }
  };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);

        if (selectedBarber && selectedDate && time) {
            const appointmentData = {
                barberId: selectedBarber.id,
                date: selectedDate,
                start: time.start,
                end: time.end,
                userId: auth.user._id
            };

            const socketStatus = BookingService.checkSocketStatus();

            if (socketStatus === WebSocket.OPEN) {
                BookingService.lockAppointment(appointmentData);
            } else {
                toast.error('WebSocket is not ready. Please try again in a moment.');
                // Optionally, you can attempt to reconnect or provide a visual indicator to the user
                BookingService.reconnectSocket();
            }
        } else {
            toast.error('Please select a service, barber, date, and time.');
        }
    };
    const handleBooking = async () => {
        setIsBookingLoading(true);
        try {
            const appointmentData = {
                userId: auth.user._id,
                barberId: selectedBarber.id,
                serviceId: selectedService._id,
                date: selectedDate,
                start: selectedTime.start,
                end: selectedTime.end
            };

            // by passing the google calendar auth for right now. going directly to the appointment creation
            // const state = JSON.stringify(appointmentData);
            // const authUrl = `${process.env.REACT_APP_API_BASE_URL}/google/auth?${new URLSearchParams({ state })}`;

            const response = await BookingService.completeBooking(appointmentData);
            if (response.success) {
                toast.success(response.message);
                setCurrentStep(1);
                setSelectedService(null);
                setSelectedBarber(null);
                setSelectedDate(null);
                setSelectedTime(null);
            } else {
                toast.error(`${response.message}`);
            }

        } catch (error) {
            console.error('Error during booking:', error);
            toast.error('Error during booking. Please try again.');
        } finally {
            setIsBookingLoading(false);
        }
    };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="container mx-auto min-h-screen flex flex-col bg-gray-100 dark:bg-black-3 p-4">
      <ToastContainer />
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-light-gray">
                Choose a service
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white dark:bg-black-2 p-4 rounded-lg shadow-md flex flex-col justify-between cursor-pointer hover:bg-light-blue dark:hover:bg-blue"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div>
                      <h3 className="font-semibold text-black dark:text-light-gray">
                        {service.name}
                      </h3>
                      <p className="text-dark-gray dark:text-uranian-blue">
                        {service.duration} mins
                      </p>
                      <p className="text-dark-gray dark:text-uranian-blue">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-right mt-4">
                      <span className="bg-light-gray dark:bg-dark-gray text-black dark:text-light-gray px-2 py-1 rounded">
                        ${service.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-light-gray">
                Choose a barber
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {barbers.map((barber) => (
                  <div
                    key={barber.id}
                    className="bg-white dark:bg-black-2 p-4 rounded-lg shadow-md flex flex-col justify-between cursor-pointer hover:bg-light-blue dark:hover:bg-blue"
                    onClick={() => handleBarberSelect(barber)}
                  >
                    <div>
                      <img
                        src={
                          barber.headShot ||
                          `${process.env.REACT_APP_API_BASE_URL}/default-headShot.png`
                        }
                        alt={barber.fullName}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <h3 className="font-semibold text-black dark:text-light-gray">
                        {barber.fullName}
                      </h3>
                      <p className="text-dark-gray dark:text-uranian-blue">
                        {barber.email}
                      </p>
                      {/* <p className="text-dark-gray dark:text-uranian-blue">{barber.phoneNumber}</p> */}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-black dark:text-light-gray">
                Choose a date
              </h2>
              <div className="grid grid-cols-7 gap-4">
                {availableDates.map((dateString) => (
                  <div
                    key={dateString}
                    className={`date-selection cursor-pointer rounded-lg transition-colors duration-300 ${
                      selectedDate === dateString
                        ? "bg-blue text-white"
                        : "bg-white text-black dark:bg-dark-gray dark:text-light-gray"
                    }`}
                    onClick={() => handleDateSelect(dateString)}
                  >
                    <div className="flex flex-col justify-center items-center p-4 h-full">
                      <div
                        className={`py-1 px-2 rounded-full ${
                          selectedDate === dateString
                            ? "bg-uranian-blue text-black"
                            : "bg-light-blue text-black"
                        }`}
                      >
                        {formatDateTime(dateString, "MMM")}
                      </div>
                      <div className="pt-2 text-4xl font-bold">
                        {formatDateTime(dateString, "DD")}
                      </div>
                      <div className="pt-2 flex flex-col items-center">
                        <span className="text-sm font-bold">
                          {formatDateTime(dateString, "ddd")}
                        </span>
                        <span className="text-sm font-bold">
                          {formatDateTime(dateString, "YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                onClick={() => setCurrentStep(2)}
              >
                Back
              </button>
            </div>
          )}

                    {currentStep === 4 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-black dark:text-light-gray">Choose a time</h2>
                            <div className='grid grid-cols-3 gap-4'>
                                {timeSlots.map((time) => (
                                    <div key={time.start} className="p-4 bg-white dark:bg-black-2 rounded-lg shadow-md cursor-pointer hover:bg-light-blue dark:hover:bg-blue">
                                        <div
                                            className={`time-selection text-center ${selectedTime === time ? 'bg-blue text-white' : 'bg-white text-black dark:bg-dark-gray dark:text-light-gray'}`}
                                            onClick={() => handleTimeSelect(time)}
                                        >
                                            <div>
                                                {new Intl.DateTimeFormat('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    timeZone: 'UTC',
                                                }).format(new Date(time.start))}
                                                {" "}to{" "}
                                                {new Intl.DateTimeFormat('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    timeZone: 'UTC',
                                                }).format(new Date(time.end))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg" onClick={handleBack}>Back</button>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-1/3 bg-white dark:bg-black-2 p-2 md:p-4 rounded-lg shadow-md mt-2 md:mt-4 md:ml-4 max-h-96 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4 text-black dark:text-light-gray">Your order</h2>
                    <p className="text-dark-gray dark:text-uranian-blue">The Den LLC</p>
                    {selectedService && (
                        <div className="flex items-center mt-2">
                            <div>
                                <p className="font-semibold text-black dark:text-light-gray">Service Details:</p>
                                <p className="text-dark-gray dark:text-uranian-blue">{selectedService.name}</p>
                                <p className="text-dark-gray dark:text-uranian-blue">{selectedService.duration} mins</p>
                                <p className="text-dark-gray dark:text-uranian-blue">${selectedService.price}</p>
                            </div>
                        </div>
                    )}
                    {selectedBarber && (
                        <div className="flex items-center mt-2">
                            <div>
                                <p className="font-semibold text-black dark:text-light-gray">Barber Details:</p>
                                <p className="text-dark-gray dark:text-uranian-blue">{selectedBarber.fullName}</p>
                                <p className="text-dark-gray dark:text-uranian-blue">{selectedBarber.email}</p>
                            </div>
                        </div>
                    )}
                    {selectedDate && <p className="mt-2 text-black dark:text-light-gray">Date: {selectedDate}</p>}
                    {selectedTime && (
                        <p className="mt-2 text-black dark:text-light-gray">
                            Time: {new Intl.DateTimeFormat('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'UTC',
                            }).format(new Date(selectedTime.start))} {" "}to{" "}
                            {new Intl.DateTimeFormat('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'UTC',
                            }).format(new Date(selectedTime.end))}
                        </p>
                    )}
                    {selectedService && selectedBarber && selectedDate && selectedTime && (
                        <button
                            className="mt-4 bg-black text-white py-2 px-4 rounded-lg w-full flex items-center justify-center"
                            onClick={handleBooking}
                            disabled={isBookingLoading}
                        >
                            {isBookingLoading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            ) : (
                                'Book Appointment'
                            )}
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Booking;
