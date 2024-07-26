import api from '../context/AxiosInterceptors';

class PasswordResetService {
    async requestPasswordReset(email) {
        try {
        const response = await api.post('/auth/request-password-reset', { email });
        return response.data;
        } catch (error) {
        console.error('Failed to request password reset:', error);
        throw new Error('Failed to request password reset');
        }
    }
    
    async resetPassword(token, userId, password) {
        try {
        const response = await api.post('/auth/reset-password', { token, userId, password });
        return response.data;
        } catch (error) {
        console.error('Failed to reset password:', error);
        throw new Error('Failed to reset password');
        }
    }
}

export default new PasswordResetService();