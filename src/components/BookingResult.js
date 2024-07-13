import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookingResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const state = params.get('state');
    
    if (state) {
      const decodedState = JSON.parse(decodeURIComponent(state));
      
      if(!decodedState.bookingResult) {
        toast.error('Booking failed. Please try again.');
        return;
      }

      setResult(decodedState.bookingResult);

      if (decodedState.bookingResult.success) {
        toast.success('Booking successful!');
      } else {
        toast.error('Booking failed. Please try again.');
      }
    } else {
      toast.error('Invalid booking result.');
    }
  }, [location]);

  if (!result) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black-2 p-4">
      {result.success ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
          <h2 className=" flex flex-col items-center justify-center text-2xl font-bold text-blue mb-4">Booking Successful</h2>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Booking Failed</h2>
          <p className="text-lg">{result.message}</p>
        </div>
      )}
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-blue text-white rounded-lg hover:bg-dark-gray transition-colors"
      >
        Go Back
      </button>
    </div>
  );
};

export default BookingResult;
