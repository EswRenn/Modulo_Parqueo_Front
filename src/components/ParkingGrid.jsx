import React from 'react';
import ParkingSlot from './ParkingSlot';

const ParkingGrid = ({ allParkings, availableParkings, onReserveClick }) => {
  const parkingsWithStatus = allParkings.map(parking => {
    const isAvailable = availableParkings.some(
      available => available.PAR_NUMERO_PARQUEO === parking.numero && 
                  available.PAR_SECCION === parking.seccion
    );
    return {
      ...parking,
      estado: isAvailable ? 1 : 0
    };
  });

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
      gap: '10px', 
      padding: '20px' 
    }}>
      {parkingsWithStatus.map((parking) => (
        <ParkingSlot 
          key={`${parking.seccion}-${parking.numero}`} 
          parking={parking}
          onReserveClick={onReserveClick}
        />
      ))}
    </div>
  );
};

export default ParkingGrid;