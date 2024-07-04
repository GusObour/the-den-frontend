import api from '../context/AxiosInterceptors';

class AvailabilityService {

  async fetchAvailabilities(barberId) {
    try {
      const response = await api.get(`/barbers/availability?barberId=${barberId}`);
      return response.data.availability;
    } catch (error) {
      console.error('Failed to fetch availabilities:', error);
      throw new Error('Failed to fetch availabilities');
    }
  }

  async addAvailability(availabilityData) {
    try {
      const response = await api.post(`/availability`, availabilityData);
      return response.data;
    } catch (error) {
      console.error('Failed to add availability:', error);
      throw new Error('Failed to add availability');
    }
  }

  async updateAvailability(id, availabilityData) {
    try {
      const response = await api.put(`/availability/${id}`, availabilityData);
      return response.data;
    } catch (error) {
      console.error('Failed to update availability:', error);
      throw new Error('Failed to update availability');
    }
  }

  async blockAvailabilities(availabilityIds) {
    try {
      const response = await api.put(`/availability/block`, { availabilityIds });
      return response.data;
    } catch (error) {
      console.error('Failed to block availabilities:', error);
      throw new Error('Failed to block availabilities');
    }
  }

  async unBlockAvailabilities(availabilityIds) {
    try {
      const response = await api.put(`/availability/unblock`, { availabilityIds });
      return response.data;
    } catch (error) {
      console.error('Failed to unlock availabilities:', error);
      throw new Error('Failed to unlock availabilities');
    }
  }
  

  async deleteAvailability(id) {
    try {
      await api.delete(`/availability/${id}`);
    } catch (error) {
      console.error('Failed to delete availability:', error);
      throw new Error('Failed to delete availability');
    }
  }
}

export default new AvailabilityService();
