import api from '../context/AxiosInterceptors';

class AppointmentService {

  async fetchAppointments(currId, isAdmin) {
    try {
      const endpoint = isAdmin
        ? `/barbers/appointments?barberId=${currId}`
        : `/user/appointments?userId=${currId}`;

      const response = await api.get(endpoint);
      return response.data.appointments;
    } catch (error) {
      console.warn('Failed to fetch appointments:', error);
    }
  }

  async completeAppointment(appointmentId, userId) {
    try {
      const response = await api.put(`/barbers/complete-appointment/${appointmentId}/${userId}`);
      return response.data;
    } catch (error) {
      console.warn('Failed to complete appointment:', error);
    }
  }

  async cancelAppointment(appointmentId, userId, isAdmin) {
    try {
      const endpoint = isAdmin
        ? `/barbers/cancel-appointment/${appointmentId}/${userId}`
        : `/user/cancel-appointment/${appointmentId}/${userId}`;

      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.warn('Failed to delete appointment:', error);
    }
  }

  async getCompletedAppointments() {
    try {
      const response = await api.get(`/stats/completed-appointments`);
      return response.data.completedAppointments;
    } catch (error) {
      console.warn('Failed to fetch completed appointments:', error);
    }
  }

  async getTodaysCanceledAppointments() {
    try {
      const response = await api.get(`/stats/canceled-appointments`);
      return response.data.canceledAppointments;
    } catch (error) {
      console.warn('Failed to fetch canceled appointments:', error);
    }
  }

  async getTodaysEarnings() {
    try {
      const response = await api.get(`/stats/todays-earnings`);
      return response.data.earnings;
    } catch (error) {
      console.warn('Failed to fetch earnings:', error);
    }
  }

  async getTotalWeekEarnings() {
    try {
      const response = await api.get(`/stats/total-week-earnings`);
      return response.data.totalEarnings;
    } catch (error) {
      console.warn('Failed to fetch total earnings:', error);
    }
  }
}

export default AppointmentService;
