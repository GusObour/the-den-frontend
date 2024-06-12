import React, { useState, useEffect } from 'react';
import BookingService from '../services/BookingService';

const Booking = () => {
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const fetchServices = async () => {
            const fetchedServices = await BookingService.fetchServices();
            setServices(fetchedServices);
        };

        const fetchBarbers = async () => {
            const fetchedBarbers = await BookingService.fetchBarbers();
            setBarbers(fetchedBarbers);
        };

        fetchServices();
        fetchBarbers();
    }, []);

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setSelectedBarber(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setCurrentStep(2);
    };

    const handleBarberSelect = (barber) => {
        setSelectedBarber(barber);
        setSelectedDate(null);
        setSelectedTime(null);
        setCurrentStep(3);
    };

    const handleDateSelect = async (date) => {
        setSelectedDate(date);
        if (selectedBarber && selectedBarber._id) {
            const fetchedTimeSlots = await BookingService.fetchAvailability(selectedBarber._id, date);
            setTimeSlots(fetchedTimeSlots);
            setCurrentStep(4);
        } else {
            console.error('No barber selected');
        }
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleBooking = async () => {
        const appointmentData = {
            date: selectedDate,
            start: selectedTime.start,
            end: selectedTime.end,
            userId: 'user_id_here',
            barberId: selectedBarber._id,
            service: selectedService.name,
            notes: ''
        };

        const appointment = await BookingService.createAppointment(appointmentData);
        if (appointment) {
            alert('Appointment booked successfully!');
        } else {
            alert('Failed to book appointment.');
        }
    };

    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black-3 p-4">
            <div className="flex-1 flex flex-col md:flex-row">
                <div className="flex-1">
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-black dark:text-light-gray">Choose a service</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {services.map(service => (
                                    <div
                                        key={service._id}
                                        className="bg-white dark:bg-black-2 p-4 rounded-lg shadow-md flex flex-col justify-between cursor-pointer hover:bg-light-blue dark:hover:bg-blue"
                                        onClick={() => handleServiceSelect(service)}
                                    >
                                        <div>
                                            <h3 className="font-semibold text-black dark:text-light-gray">{service.name}</h3>
                                            <p className="text-dark-gray dark:text-uranian-blue">{service.duration} mins</p>
                                        </div>
                                        <div className="text-right mt-4">
                                            <span className="bg-light-gray dark:bg-dark-gray text-black dark:text-light-gray px-2 py-1 rounded">${service.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-black dark:text-light-gray">Choose a barber</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {barbers.map(barber => (
                                    <div
                                        key={barber._id}
                                        className="bg-white dark:bg-black-2 p-4 rounded-lg shadow-md flex flex-col justify-between cursor-pointer hover:bg-light-blue dark:hover:bg-blue"
                                        onClick={() => handleBarberSelect(barber)}
                                    >
                                        <div>
                                            <h3 className="font-semibold text-black dark:text-light-gray">{barber.fullName}</h3>
                                            <p className="text-dark-gray dark:text-uranian-blue">{barber.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg" onClick={handleBack}>Back</button>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-black dark:text-light-gray">Choose a date</h2>
                            <div className="grid grid-cols-7 gap-4 rounded-t overflow-hidden text-center">
                                {Array.from({ length: 21 }, (_, i) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() + i);
                                    const dateString = date.toISOString().split('T')[0];
                                    return (
                                        <div
                                            key={dateString}
                                            className={`date-selection text-center cursor-pointer ${selectedDate === dateString ? 'bg-blue text-white' : 'bg-white text-black dark:bg-dark-gray dark:text-light-gray'}`}
                                            onClick={() => handleDateSelect(dateString)}
                                        >
                                            <div className="flex flex-col justify-center p-2">
                                                <div className="bg-light-blue text-black py-1">
                                                    {date.toLocaleString('en-US', { month: 'short' })}
                                                </div>
                                                <div className="pt-1">
                                                    <span className="text-4xl font-bold">{date.getDate()}</span>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-xs font-bold">{date.toLocaleString('en-US', { weekday: 'short' })}</span>
                                                    <span className="text-xs font-bold">{date.getFullYear()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg" onClick={handleBack}>Back</button>
                        </div>
                    )}
                    {currentStep === 4 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-black dark:text-light-gray">Choose a time</h2>
                            <div className='grid grid-cols-3 gap-4'>
                                {timeSlots.map((time) => (
                                    <div
                                        key={time.start}
                                        className={`p-4 bg-white dark:bg-black-2 rounded-lg shadow-md cursor-pointer hover:bg-light-blue dark:hover:bg-blue ${selectedTime === time ? 'bg-blue text-white' : 'bg-white text-black dark:bg-dark-gray dark:text-light-gray'}`}
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
                        <button className="mt-4 bg-black text-white py-2 px-4 rounded-lg w-full" onClick={handleBooking}>Book Appointment</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;
