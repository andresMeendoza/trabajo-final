import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AgregarPartido = () => {
  const [partido, setPartido] = useState({
    local: {
      id: '',
      nombre: '',
      lugarJuego: '',
      directorTecnico: '',
    },
    visitante: {
      id: '',
      nombre: '',
      lugarJuego: '',
      directorTecnico: '',
    },
    fecha: '',
    estadio: '',
    arbitroPrincipal: '',
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [errorArbitro, setErrorArbitro] = useState('');

  const handleAgregarPartido = () => {
    const regexNombre = /^[A-Za-z\s]+$/;

    if (!partido.arbitroPrincipal.match(regexNombre)) {
      setErrorArbitro('Solo se permiten letras y espacios');
      return;
    }

    const fechaFormateada = new Date(partido.fecha).toISOString().split('T')[0];
    const localConId = { ...partido.local, id: parseInt(partido.local.id) };
    const visitanteConId = { ...partido.visitante, id: parseInt(partido.visitante.id) };

    const partidoConDatosCompletos = {
      local: localConId,
      visitante: visitanteConId,
      fecha: fechaFormateada,
      estadio: partido.estadio,
      arbitroPrincipal: partido.arbitroPrincipal,
    };

    axios.post('http://localhost:8080/partidos', partidoConDatosCompletos)
      .then(response => {
        console.log('Partido agregado:', response.data);
       
        Swal.fire({
          icon: 'success',
          title: 'Partido Agregado',
          text: 'El partido se agregó con éxito.',
        });

      
        setMostrarFormulario(false);
      
        setErrorArbitro('');
      })
      .catch(error => {
        console.error('Error al agregar partido:', error);

        // Mostrar SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al agregar el partido. Por favor, inténtalo de nuevo.',
        });
      });
  };

  const handleInputChange = (e) => {
 
    setPartido({ ...partido, arbitroPrincipal: e.target.value });
    
    setErrorArbitro('');
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  
    setErrorArbitro('');
  };

  return (
    <div>
      <h2>Agregar Partido</h2>
      <button onClick={toggleFormulario}className="btn btn-outline-danger">{mostrarFormulario ? 'Cancelar' : 'Agregar partido'}</button>

      {mostrarFormulario && (
        <div>
          <table>
            <tbody>
              <tr>
                <td>ID del Equipo Local:</td>
                <td><input type="text" value={partido.local.id} onChange={e => setPartido({ ...partido, local: { ...partido.local, id: e.target.value } })}className="form-control"/></td>
              </tr>
              <tr>
                <td>ID del Equipo Visitante:</td>
                <td><input type="text" value={partido.visitante.id} onChange={e => setPartido({ ...partido, visitante: { ...partido.visitante, id: e.target.value } })}className="form-control" /></td>
              </tr>
              <tr>
                <td>Fecha:</td>
                <td><input type="date" value={partido.fecha} onChange={e => setPartido({ ...partido, fecha: e.target.value })} className="form-control"/></td>
              </tr>
              <tr>
                <td>Estadio:</td>
                <td><input type="text" value={partido.estadio} onChange={e => setPartido({ ...partido, estadio: e.target.value })} className="form-control"/></td>
              </tr>
              <tr>
                <td>Árbitro Principal:</td>
                <td>
                  <input
                    type="text"
                    value={partido.arbitroPrincipal}
                    onChange={handleInputChange} className="form-control"
                  />
                  {errorArbitro && <span style={{ color: 'red' }}>{errorArbitro}</span>}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button onClick={handleAgregarPartido}className="btn btn-outline-danger">Agregar Partido</button>
        </div>
      )}
    </div>
  );
};

export default AgregarPartido;
