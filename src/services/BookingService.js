class BookingService {
    async fetchServices() {
        try {
            const response = await fetch('/api/services');
            const services = await response.json();
            return services;
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    }

    async fetchBarbers() {
        try {
            const response = await fetch('/api/barbers');
            const barbers = await response.json();
            return barbers;
        } catch (error) {
            console.error('Error fetching barbers:', error);
            return [];
        }
    }

    async fetchAvailability(barberId, date) {
        try {
            const response = await fetch(`/api/availability?barberId=${barberId}&date=${date}`);
            const availability = await response.json();
            return availability;
        } catch (error) {
            console.error('Error fetching availability:', error);
            return [];
        }
    }

    async createAppointment(appointmentData) {
        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });
            const appointment = await response.json();
            return appointment;
        } catch (error) {
            console.error('Error creating appointment:', error);
            return null;
        }
    }
}

export default new BookingService();
