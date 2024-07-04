// import React from 'react';

// const BookingSuccessModal = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Booking in Progress...</h2>
//         <p>Please wait while we finalize your booking.</p>
//         <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingSuccessModal;


import React from 'react';

const BookingSuccessModal = ({ tokens, appointmentData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Booking in Progress...</h2>
        <p>Please wait while we finalize your booking.</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
