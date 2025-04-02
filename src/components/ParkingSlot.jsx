import React from 'react';

const ParkingSlot = ({ parking, onReserveClick }) => {
  const parkingStyle = {
    backgroundColor: parking.estado === 1 ? 'green' : 'red',
    color: 'white',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    textAlign: 'center',
    minWidth: '120px'
  };

  return (
    <div style={parkingStyle}>
      <h3>Parqueo {parking.numero}</h3>
      <p>Sección: {parking.seccion}</p>
      <p>Estado: {parking.estado === 1 ? 'Disponible' : 'Reservado'}</p>
      {parking.estado === 1 && (
        <button 
          onClick={() => onReserveClick(parking.id)}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          Reservar
        </button>
      )}
    </div>
  );
};

export default ParkingSlot;