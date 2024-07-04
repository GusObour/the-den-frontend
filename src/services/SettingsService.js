import api from '../context/AxiosInterceptors';

class SettingsService {
  async updateUserProfile(userId, formData) {
    try {
      const response = await api.put(`/auth/update-profile/${userId}`, formData);
      return response.data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw new Error('Failed to update profile');
    }
  }

  async changePassword(userId, passwordData) {
    try {
      const response = await api.put(`/auth/change-password/${userId}`, passwordData);
      return response.data;
    } catch (error) {
      console.error('Failed to change password:', error);
      throw new Error('Failed to change password');
    }
  }

  async deleteUserAccount(userId) {
    try {
      await api.delete(`/auth/delete-profile/${userId}`);
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw new Error('Failed to delete account');
    }
  }
}

export default new SettingsService();
