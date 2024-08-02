import React from 'react';
import '../styles/About.css';

const LocationAndAbout = () => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=114+S+4th+St+c,+Manhattan,+KS+66502`;

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="profileCard bg-white dark:bg-gray-800 shadow rounded-lg p-8">
          <div className="text-center">
            <img
              src={`${process.env.PUBLIC_URL}/imgs/TheDen.jpeg`}
              alt="Avatar"
              className="h-24 w-24 rounded-full mx-auto mb-4"
            />
            <p>
              With over 20 years of experience in the hair industry, our barber is dedicated to providing high-quality cuts and superior customer service. Hair cutting and styling has always been his passion, and he loves nothing more than seeing a satisfied customer with a fresh cut.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-black-2">Our Location</h2>
          <div className="mb-6">
            <p className="text-xl mb-2 text-dark-gray">Visit us at:</p>
            <p className="text-lg mb-4 text-black-2">114 S 4th St c, Manhattan, KS 66502</p>
            <p className="text-lg mb-6 text-black-2">Hours: Mon-Fri 10-5 • Sat 9-2</p>
          </div>
          <div className="w-full h-0 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
            <iframe
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={googleMapsUrl}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationAndAbout;
