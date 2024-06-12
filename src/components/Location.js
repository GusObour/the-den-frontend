import React from 'react';

const Location = () => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=114+S+4th+St+c,+Manhattan,+KS+66502`;

  return (
    <div className="container mx-auto py-20">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-black-2">Our Location</h2>
        <div className="mb-6">
          <p className="text-xl mb-2 text-dark-gray">Visit us at:</p>
          <p className="text-lg mb-4 text-black-2">114 S 4th St c, Manhattan, KS 66502</p>
          <p className="text-lg mb-6 text-black-2">Hours: Mon-Fri 10-5 • Sat 9-2</p>
        </div>
        <div className="overflow-hidden rounded-lg">
          <iframe
            width="700"
            height="450"
            style={{ border: 0, borderRadius: '1rem'}}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={googleMapsUrl}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
