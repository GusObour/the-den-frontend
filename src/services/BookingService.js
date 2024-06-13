import { toast } from 'react-toastify';

class BookingService {
    constructor() {
        this.socket = null;
    }

    async fetchServices() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/services`);
            const services = await response.json();
            return services;
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    }

    async fetchBarbers() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/barbers`);
            const barbers = await response.json();
            return barbers;
        } catch (error) {
            console.error('Error fetching barbers:', error);
            return [];
        }
    }

    async fetchAvailability(barberId, date) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/availability?barberId=${barberId}&date=${date}`);
            const availability = await response.json();
            return availability;
        } catch (error) {
            console.error('Error fetching availability:', error);
            return [];
        }
    }

    connectSocket(onMessageCallback) {
        this.socket = new WebSocket('ws://localhost:5000');
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
        this.socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            onMessageCallback(data);
        };
    }

    disconnectSocket() {
        if (this.socket) {
            this.socket.close();
        }
    }

    lockAppointment(appointmentData) {
        if (this.socket) {
            this.socket.send(JSON.stringify({
                action: 'lock',
                appointmentData
            }));
        } else {
            console.error('WebSocket connection is not established.');
        }
    }

    async bookAppointment(appointmentData) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/book/appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });

            return response.json();
        } catch (e) {
            console.error('Error booking appointment:', e);
            toast.error('Failed to book appointment');
            return null;
        }
    }
}

export default new BookingService();
