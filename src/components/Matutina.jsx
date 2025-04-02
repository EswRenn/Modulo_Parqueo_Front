import React, { useState, useEffect } from 'react';
import ParkingGrid from '../components/ParkingGrid';

const Matutina = () => {
  const [availableParkings, setAvailableParkings] = useState([]);
  const [userId, setUserId] = useState(351); // Valor por defecto
  const [selectedParking, setSelectedParking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Generar los 100 parqueos iniciales
  const generateAllParkings = () => {
    const allParkings = [];
    
    // 70 parqueos para estudiantes (sección E)
    for (let i = 1; i <= 70; i++) {
      allParkings.push({
        id: `E-${i}`,
        numero: i,
        seccion: 'E',
        estado: 1
      });
    }
    
    // 20 parqueos para administrativos (sección A)
    for (let i = 1; i <= 20; i++) {
      allParkings.push({
        id: `A-${i}`,
        numero: i,
        seccion: 'A',
        estado: 1
      });
    }
    
    // 10 parqueos para visitas (sección V)
    for (let i = 1; i <= 10; i++) {
      allParkings.push({
        id: `V-${i}`,
        numero: i,
        seccion: 'V',
        estado: 1
      });
    }
    
    return allParkings;
  };

  const [allParkings] = useState(generateAllParkings());

  // Obtener parqueos disponibles
  const fetchAvailableParkings = async () => {
    try {
      const endpoints = [
        '/api/disponibilidad_parqueo?JOR_TIPO=MATUTINA&SECCION=E',
        '/api/disponibilidad_parqueo?JOR_TIPO=MATUTINA&SECCION=A',
        '/api/disponibilidad_parqueo?JOR_TIPO=MATUTINA&SECCION=V'
      ];

      const responses = await Promise.all(endpoints.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));
      
      setAvailableParkings(data.flat());
    } catch (error) {
      console.error('Error al obtener los Estacionamintos disponibles:', error);
    }
  };

  // Función para reservar un parqueo
  const handleReserve = async () => {
    if (!selectedParking) return;
    
    try {
      const [seccion, numero] = selectedParking.split('-');
      
      // Busca el JOR_JORNADA_ID correspondiente al parqueo
      const parkingData = availableParkings.find(
        p => p.PAR_NUMERO_PARQUEO === parseInt(numero) && 
             p.PAR_SECCION === seccion
      );

      if (!parkingData) {
        throw new Error('No se encontró información del parqueo');
      }

      const response = await fetch('/api/insertar_parqueo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "RES_ID_USUARIO": userId,
          "JOR_JORNADA_ID": parkingData.JOR_JORNADA_ID,
          "RES_FECHA_INICIO": "2025-04-01 10:00:00",
          "RES_FECHA_FIN": "2025-06-01 10:00:00",
          "PAR_NUMERO_PARQUEO": parseInt(numero),
          "PAR_SECCION": seccion
        }),
      });

      if (response.ok) {
        await fetchAvailableParkings();
        alert('Parqueo reservado con éxito');
      } else {
        const errorData = await response.json();
        alert(`Error al reservar: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error reserving parking:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchAvailableParkings();
    const interval = setInterval(fetchAvailableParkings, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Estado de los Parqueos</h1>
      
      {/* Input para ID de Usuario */}
      <div style={{ margin: '20px 0' }}>
        <label>
          ID de Usuario:
          <input 
            type="number" 
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value) || 0)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      {/* Leyenda de estado */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'green', marginRight: '10px' }}></div>
        <span>Disponible</span>
        <div style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'red', margin: '0 10px 0 20px' }}></div>
        <span>Reservado</span>
      </div>
      
      {/* Grid de parqueos */}
      <ParkingGrid 
        allParkings={allParkings} 
        availableParkings={availableParkings}
        onReserveClick={(parkingId) => {
          setSelectedParking(parkingId);
          setShowModal(true);
        }}
      />

      {/* Modal de confirmación */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          zIndex: 1000
        }}>
          <h3>Confirmar Reserva</h3>
          <p>¿Reservar parqueo {selectedParking} para el usuario {userId}?</p>
          <p>Fecha: 01/04/2025 10:00 a 01/05/2025 10:00</p>
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={handleReserve}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '8px 16px',
                marginRight: '10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Confirmar
            </button>
            <button 
              onClick={() => setShowModal(false)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matutina;