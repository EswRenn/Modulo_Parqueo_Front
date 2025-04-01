import React, { useState } from 'react';
import './App.css'; // Importa el archivo CSS
import Matutina from './components/Matutina';
import Vespertina from './components/Vespertina';
import Nocturna from './components/Nocturna';
import Sabado from './components/Sabado';
import Domingo from './components/Domingo';

function App() {
  const [selectedTurno, setSelectedTurno] = useState('Matutina'); // Estado para controlar la selección

  const handleSelectionChange = (event) => {
    setSelectedTurno(event.target.value); // Actualiza el estado según la selección
  };

  return (
    <div>
      {/* Lista de selección */}
      <div className="select-container">
        <label htmlFor="turno-select">Selecciona un turno:</label>
        <select id="turno-select" onChange={handleSelectionChange} value={selectedTurno}>
        <option value="Matutina">Turno Matutino</option>
          <option value="Vespertina">Turno Vespertino</option>
          <option value="Nocturna">Turno Nocturno</option>
          <option value="Sabado">Turno Sabado</option>
          <option value="Domingo">Turno Domingo</option>
        </select>
      </div>

      {/* Renderizado condicional */}
      <div>
        {selectedTurno === 'Matutina' && (
          <div>
            <h2>Turno Matutino</h2>
            <Matutina />
          </div>
        )}
        {selectedTurno === 'Vespertina' && (
          <div>
            <h2>Turno Vespertino</h2>
            <Vespertina />
          </div>
        )}
        {selectedTurno === 'Nocturna' && (
          <div>
            <h2>Turno Nocturno</h2>
            <Nocturna />
          </div>
        )}
        {selectedTurno === 'Sabado' && (
          <div>
            <h2>Turno Sabado</h2>
            <Sabado />
          </div>
        )}
         
         {selectedTurno === 'Domingo' && (
          <div>
            <h2>Turno Domingo</h2>
            <Domingo/>
          </div>
        )}  

      </div>
    </div>
  );
}

export default App;