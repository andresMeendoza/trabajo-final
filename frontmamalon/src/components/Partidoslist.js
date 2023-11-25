import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { format } from 'date-fns';

const PartidosList = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/partidos');
        console.log('Datos de partidos recibidos:', response.data);

        
        const partidosOrdenados = response.data.sort((a, b) => a.id - b.id);

        setPartidos(partidosOrdenados);
      } catch (error) {
        console.error('Error fetching partidos:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
  
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy');
  };

  return (
    <div>
      <h2>Lista de Partidos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nro de partido</th>
            <th>Local</th>
            <th>Visitante</th>
            <th>Fecha</th>
            <th>Estadio</th>
            <th>Árbitro Principal</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((partido) => (
            <tr key={partido.id}>
              <td>{partido.id}</td>
              <td>{partido.local.nombre}</td>
              <td>{partido.visitante.nombre}</td>
              <td>{formatDate(partido.fecha)}</td>
              <td>{partido.estadio}</td>
              <td>{partido.arbitroPrincipal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PartidosList;
