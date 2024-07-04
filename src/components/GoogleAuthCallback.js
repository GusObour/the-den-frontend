import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingService from '../services/BookingService';
import { toast } from 'react-toastify';

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokens = searchParams.get('tokens');
    const state = searchParams.get('state');

    if (tokens && state) {
      const decodedTokens = JSON.parse(decodeURIComponent(tokens));
      const decodedState = JSON.parse(decodeURIComponent(state));

      console.log('decodedState:', decodedState);

      BookingService.completeBooking(decodedState, decodedTokens)
        .then(results => {
          if (results.error) {
            toast.error(results.error);
            navigate('/');
          } else {
            toast.success('Successfully booked appointment!');
            navigate('/bookingsuccess');
          }
        })
        .catch(error => {
          console.error('Error completing booking:', error);
          navigate('/');
        });
    } else {
      console.error('Missing code or state in URL parameters');
      navigate('/');
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default GoogleAuthCallback;
