import React from 'react';

const StatCard = ({ title, value, color }) => {
  return (
    <div className={`p-4 ${color} rounded-lg shadow`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
