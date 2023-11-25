import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
const MostrarEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/equipos');
        console.log('Datos de equipos recibidos:', response.data);
        setEquipos(response.data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener equipos',
          text: 'Hubo un problema al obtener la lista de equipos. Por favor, inténtalo de nuevo.',
        });
      }
    };

    fetchData();
  }, [ultimaActualizacion]); 

  return (
    <div>
      <h2>Lista de Equipos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Director Técnico</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map(equipo => (
            <tr key={equipo.id}  >
              <td>{equipo.id}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.directorTecnico}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MostrarEquipos;
