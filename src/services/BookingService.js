import { toast } from 'react-toastify';
import api from '../context/AxiosInterceptors';

class BookingService {
  constructor() {
    this.socket = null;
    this.reconnectInterval = 5000;
    this.reconnectTimeout = null;
    this.onMessageCallback = null;
  }

  async fetchServices() {
    try {
      const response = await api.get(`/services`);
      return response.data;
    } catch (error) {
      console.warn('Error fetching services:', error);
      return [];
    }
  }

  async fetchBarbers() {
    try {
      const response = await api.get(`/barbers`);
      return response.data;
    } catch (error) {
      console.warn('Error fetching barbers:', error);
      return [];
    }
  }

  async fetchAvailabilityDates(selectedBarberId){
    try {
      const response = await api.get(`/availability/dates`, { params: { barberId: selectedBarberId } });
      return response.data;
    } catch (error) {
      console.warn('Error fetching availability dates:', error);
      return [];
    }
  }

  async fetchAvailability(barberId, date, userId) {
    try {
      const response = await api.get(`/availability`, { params: { barberId, date, userId } });
      return response.data;
    } catch (error) {
      console.warn('Error fetching availability:', error);
      return [];
    }
  }

  connectSocket(onMessageCallback) {
    this.onMessageCallback = onMessageCallback;
    this.socket = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}`);
    
    this.socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      onMessageCallback(data);
    };
    
    this.socket.onclose = () => {
      console.warn('WebSocket connection closed, attempting to reconnect...');
      this.reconnectSocket();
    };
    
    this.socket.onerror = (error) => {
      console.warn('WebSocket error occurred:', error);
      this.socket.close();
    };
  }

  checkSocketStatus() {
    if (this.socket) {
      return this.socket.readyState;
    } else {
      return WebSocket.CLOSED;
    }
  }

  reconnectSocket() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    this.reconnectTimeout = setTimeout(() => {
      this.connectSocket(this.onMessageCallback);
    }, this.reconnectInterval);
  }

  disconnectSocket() {
    if (this.socket) {
      this.socket.close();
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
  }

  lockAppointment(appointmentData) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        action: 'lock',
        appointmentData
      }));
    } else {
      throw new Error('WebSocket connection is not established.');
    }
  }


  async completeBooking(appointmentData) {
    try {
      const response = await api.post('/user/complete-appointment', { appointmentData });
      return response.data;
    } catch (error) {
      console.error('Error completing booking:', error);
      throw error;
    }
  }
}

export default new BookingService();
