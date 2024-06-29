import api from '../context/AxiosInterceptors';

class AppointmentService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }

  async fetchAppointments(currId, isAdmin) {
    try {
      const endpoint = isAdmin
        ? `${this.baseUrl}/barbers/appointments?barberId=${currId}`
        : `${this.baseUrl}/user/appointments?userId=${currId}`;

      const response = await api.get(endpoint);
      return response.data.appointments;
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      throw new Error('Failed to fetch appointments');
    }
  }

  async completeAppointment(appointmentId, userId) {
    try {
      const response = await api.put(`${this.baseUrl}/barbers/complete-appointment/${appointmentId}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to complete appointment:', error);
      throw error;
    }
  }

  async cancelAppointment(appointmentId, userId, isAdmin) {
    try {
      const endpoint = isAdmin
        ? `${this.baseUrl}/barbers/cancel-appointment/${appointmentId}/${userId}`
        : `${this.baseUrl}/user/cancel-appointment/${appointmentId}/${userId}`;

      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error('Failed to delete appointment:', error);
      throw new Error('Failed to delete appointment');
    }
  }

  async getCompletedAppointments() {
    try {
      const response = await api.get(`${this.baseUrl}/stats/completed-appointments`);
      return response.data.completedAppointments;
    } catch (error) {
      console.error('Failed to fetch completed appointments:', error);
      throw new Error('Failed to fetch completed appointments');
    }
  }

  async getTodaysCanceledAppointments() {
    try {
      const response = await api.get(`${this.baseUrl}/stats/canceled-appointments`);
      return response.data.canceledAppointments;
    } catch (error) {
      console.error('Failed to fetch canceled appointments:', error);
      throw new Error('Failed to fetch canceled appointments');
    }
  }

  async getTodaysEarnings() {
    try {
      const response = await api.get(`${this.baseUrl}/stats/todays-earnings`);
      return response.data.earnings;
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
      throw new Error('Failed to fetch earnings');
    }
  }

  async getTotalWeekEarnings() {
    try {
      const response = await api.get(`${this.baseUrl}/stats/total-week-earnings`);
      return response.data.totalEarnings;
    } catch (error) {
      console.error('Failed to fetch total earnings:', error);
      throw new Error('Failed to fetch total earnings');
    }
  }
}

export default AppointmentService;
