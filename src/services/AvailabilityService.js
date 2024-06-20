import axios from 'axios';

class AvailabilityService {
  constructor() {
    this.apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    this.authHeaders = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };
  }

  async fetchAvailabilities(barberId) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/barbers/availability?barberId=${barberId}`, {
        headers: this.authHeaders,
      });
      return response.data.availability;
    } catch (error) {
      throw new Error('Failed to fetch availabilities');
    }
  }

  async addAvailability(availabilityData) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/availabilities`, availabilityData, {
        headers: this.authHeaders,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to add availability');
    }
  }

  async updateAvailability(id, availabilityData) {
    try {
      const response = await axios.put(`${this.apiBaseUrl}/availabilities/${id}`, availabilityData, {
        headers: this.authHeaders,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update availability');
    }
  }

  async deleteAvailability(id) {
    try {
      await axios.delete(`${this.apiBaseUrl}/availabilities/${id}`, {
        headers: this.authHeaders,
      });
    } catch (error) {
      throw new Error('Failed to delete availability');
    }
  }
}

export default new AvailabilityService();
