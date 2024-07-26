import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import PasswordResetService from '../services/PasswordResetService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestReset = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = await PasswordResetService.requestPasswordReset(email);
            toast.success(data.message);
        } catch (error) {
            toast.error('Error sending reset link. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-20 px-4">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-8 text-center text-black-2">
                Request Password Reset
            </h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-blue text-white py-2 px-4 w-full rounded hover:bg-light-blue transition duration-200 ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>

    );
};

export default RequestReset;
