import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AgregarEquipo = () => {
  const [nombre, setNombre] = useState('');
  const [directorTecnico, setDirectorTecnico] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorDirectorTecnico, setErrorDirectorTecnico] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleAgregarEquipo = () => {
    const regexNombre = /^[A-Za-z]+$/;
    if (!nombre.match(regexNombre)) {
      setErrorNombre('Solo se permiten letras');
      return;
    }

    if (!directorTecnico.match(regexNombre)) {
      setErrorDirectorTecnico('Solo se permiten letras');
      return;
    }

    axios.post('http://localhost:8080/equipos', { nombre, directorTecnico })
      .then(response => {
        console.log('Equipo agregado:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Equipo agregado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        setErrorNombre('');
        setErrorDirectorTecnico('');
        setMostrarFormulario(false);
      })
      .catch(error => {
        console.error('Error adding equipo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar equipo',
          text: 'Hubo un problema al agregar el equipo. Por favor, inténtalo de nuevo.',
        });
      });
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
    setErrorNombre('');
  };

  const handleDirectorTecnicoChange = (e) => {
    setDirectorTecnico(e.target.value);
    setErrorDirectorTecnico('');
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    setErrorNombre('');
    setErrorDirectorTecnico('');
  };

  return (
    <div>
      <h2>Agregar Equipo</h2>
      <button onClick={toggleFormulario} className="btn btn-outline-danger">
        {mostrarFormulario ? 'Cancelar' : 'Agregar equipo'}
      </button>
      {mostrarFormulario && (
        <div>
          <table>
            <tbody>
              <tr>
                <td><label>Nombre del Equipo:</label></td>
                <td>
                  <input
                    type="text"
                    value={nombre}
                    onChange={handleNombreChange}
                    className="form-control"
                  />
                  {errorNombre && <span style={{ color: 'red' }}>{errorNombre}</span>}
                </td>
              </tr>
              <tr>
                <td><label>Director Técnico:</label></td>
                <td>
                  <input
                    type="text"
                    value={directorTecnico}
                    onChange={handleDirectorTecnicoChange}
                    className="form-control"
                  />
                  {errorDirectorTecnico && <span style={{ color: 'red' }}>{errorDirectorTecnico}</span>}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button onClick={handleAgregarEquipo} className="btn btn-outline-danger">
            Agregar Equipo
          </button>
        </div>
      )}
    </div>
  );
};

export default AgregarEquipo;
