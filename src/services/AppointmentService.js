import axios from 'axios';

class AppointmentService {
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_BASE_URL;
        this.token = localStorage.getItem('token');
    }

    get authHeaders() {
        return {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        };
    }

    async fetchAppointments(currId, isAdmin) {
        try {
            const endpoint = isAdmin
                ? `${this.baseUrl}/barbers/appointments?barberId=${currId}`
                : `${this.baseUrl}/user/appointments?userId=${currId}`;

            const response = await axios.get(endpoint, {
                headers: this.authHeaders,
            });

            return response.data.appointments;
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
            throw new Error('Failed to fetch appointments');
        }
    }

    async completeAppointment(id) {
        try {
            await axios.put(`${this.baseUrl}/appointments/${id}/complete`, null, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            });
            this.cache = this.cache.map(appointment => (appointment.id === id ? { ...appointment, status: 'Completed' } : appointment));
        } catch (error) {
            console.error('Failed to complete appointment:', error);
            throw new Error('Failed to complete appointment');
        }
    }

    async cancelAppointment(appointmentId, userId, isAdmin) {
        try {
            const endpoint = isAdmin
                ? `${this.baseUrl}/barbers/cancel-appointment/${appointmentId}/${userId}`
                : `${this.baseUrl}/user/cancel-appointment/${appointmentId}/${userId}`;
    
            const response = await axios.delete(endpoint, {
                headers: this.authHeaders
            });
    
            return response.data;
        } catch (error) {
            console.error('Failed to delete appointment:', error);
            throw new Error('Failed to delete appointment');
        }
    }
    


    getCachedAppointments() {
        return this.cache;
    }


    async getCompletedAppointments() {
        try {
            const response = await axios.get(`${this.baseUrl}/stats/completed-appointments`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.completedAppointments;
        } catch (error) {
            console.error('Failed to fetch completed appointments:', error);
            throw new Error('Failed to fetch completed appointments');
        }
    }

    async getTodaysCanceledAppointments() {
        try {
            const response = await axios.get(`${this.baseUrl}/stats/canceled-appointments`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.canceledAppointments;
        } catch (error) {
            console.error('Failed to fetch canceled appointments:', error);
            throw new Error('Failed to fetch canceled appointments');
        }
    }

    async getTodaysEarnings() {
        try {
            const response = await axios.get(`${this.baseUrl}/stats/todays-earnings`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.earnings;
        } catch (error) {
            console.error('Failed to fetch earnings:', error);
            throw new Error('Failed to fetch earnings');
        }
    }

    async getTotalWeekEarnings() {
        try {
            const response = await axios.get(`${this.baseUrl}/stats/total-week-earnings`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.totalEarnings;
        } catch (error) {
            console.error('Failed to fetch total earnings:', error);
            throw new Error('Failed to fetch total earnings');
        }
    }
}

export default AppointmentService;
