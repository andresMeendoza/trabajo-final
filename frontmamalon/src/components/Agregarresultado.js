import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const AgregarResultado = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [resultado, setResultado] = useState({
    golLocal: '',
    golVisitante: '',
    nroTarjetaRoja: '',
    nroTarjetaAmarilla: '',
  });

  const handleAgregarResultado = () => {
    if (!resultado.golLocal || !resultado.golVisitante || isNaN(resultado.golLocal) || isNaN(resultado.golVisitante)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete los campos de goles con valores numéricos.',
      });
      return;
    }

   
    axios.post('http://localhost:8080/resultados', resultado)
      .then(response => {
        console.log('Resultado agregado:', response.data);
        setResultado({
          golLocal: '',
          golVisitante: '',
          nroTarjetaRoja: '',
          nroTarjetaAmarilla: '',
        });
        setMostrarFormulario(false);
    
        Swal.fire({
          icon: 'success',
          title: 'Resultado Agregado',
          text: 'El resultado se agregó con éxito.',
        });
      })
      .catch(error => {
        console.error('Error al agregar resultado:', error);
       
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al agregar el resultado. Por favor, inténtalo de nuevo.',
        });
      });
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <div>
      <h2>Agregar Resultado</h2>
      <button onClick={toggleFormulario} className="btn btn-outline-danger">
        {mostrarFormulario ? 'Cancelar' : 'Agregar resultado'}
      </button>

      {mostrarFormulario && (
        <div>
          <table>
            <tbody>
              <tr>
                <td>Goles del Equipo Local:</td>
                <td>
                  <input
                    type="number"
                    value={resultado.golLocal}
                    onInput={e => setResultado({ ...resultado, golLocal: e.target.value })}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Goles del Equipo Visitante:</td>
                <td>
                  <input
                    type="number"
                    value={resultado.golVisitante}
                    onInput={e => setResultado({ ...resultado, golVisitante: e.target.value })}
                    className="form-control"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button onClick={handleAgregarResultado} className="btn btn-outline-danger">
            Agregar Resultado
          </button>
        </div>
      )}
    </div>
  );
};

export default AgregarResultado;
