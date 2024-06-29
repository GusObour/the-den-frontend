import api from '../context/AxiosInterceptors';

class AvailabilityService {
  constructor() {
    this.apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  }

  async fetchAvailabilities(barberId) {
    try {
      const response = await api.get(`${this.apiBaseUrl}/barbers/availability?barberId=${barberId}`);
      return response.data.availability;
    } catch (error) {
      console.error('Failed to fetch availabilities:', error);
      throw new Error('Failed to fetch availabilities');
    }
  }

  async addAvailability(availabilityData) {
    try {
      const response = await api.post(`${this.apiBaseUrl}/availabilities`, availabilityData);
      return response.data;
    } catch (error) {
      console.error('Failed to add availability:', error);
      throw new Error('Failed to add availability');
    }
  }

  async updateAvailability(id, availabilityData) {
    try {
      const response = await api.put(`${this.apiBaseUrl}/availabilities/${id}`, availabilityData);
      return response.data;
    } catch (error) {
      console.error('Failed to update availability:', error);
      throw new Error('Failed to update availability');
    }
  }

  async deleteAvailability(id) {
    try {
      await api.delete(`${this.apiBaseUrl}/availabilities/${id}`);
    } catch (error) {
      console.error('Failed to delete availability:', error);
      throw new Error('Failed to delete availability');
    }
  }
}

export default new AvailabilityService();
