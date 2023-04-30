import React from 'react';

function Circle({ value }) {
  const circleStyle = {
    10: { backgroundColor: 'white', border: '1px solid white' },
    20: { backgroundColor: 'white', border: '1px solid #038cfc' },
    30: { backgroundColor: '#038cfc', border: '1px solid #038cfc' },
  };

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle"
      style={{
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        ...circleStyle[value],
      }}
    />
  );
}

export default Circle;
