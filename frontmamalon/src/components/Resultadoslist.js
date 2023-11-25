import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const ResultadosList = () => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/resultados');
        console.log('Datos de resultados recibidos:', response.data);

       
        const resultadosOrdenados = response.data.sort((a, b) => a.id - b.id);

        setResultados(resultadosOrdenados);
      } catch (error) {
        console.error('Error fetching resultados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Resultados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de Partido</th>
            <th>Goles Local</th>
            <th>Goles Visitante</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map(resultado => (
            <tr key={resultado.id}>
              <td>{resultado.id}</td>
              <td>{resultado.golLocal}</td>
              <td>{resultado.golVisitante}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResultadosList;
