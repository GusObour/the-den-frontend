import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, useLocation , useNavigate} from 'react-router-dom';
import PasswordResetService from '../services/PasswordResetService';
import validator from "validator";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const userId = queryParams.get('userID');



    const validateInputs = () => {
        if (!validator.isStrongPassword(newPassword)) {
            return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if(!token){
            toast.error('Invalid token');
            navigate('/login');
        }

        if(!userId){
            toast.error('Invalid user');
            navigate('/login');
        }

        const validationError = validateInputs();
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await PasswordResetService.resetPassword(token, userId, newPassword);
            if(data.success){
                toast.success(data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            toast.error('Error resetting password. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-20 px-4">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-8 text-center text-black-2">
                Reset Password
            </h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
