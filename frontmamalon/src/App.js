import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PartidosList from './components/Partidoslist';
import AgregarPartido from './components/Agregarpartido';
import ResultadosList from './components/Resultadoslist';
import AgregarEquipo from './components/Agregarequipo';
import MostrarEquipos from './components/MostrarEquipos';
import AgregarResultado from './components/Agregarresultado';

function App() {
  const [mostrarEquipos, setMostrarEquipos] = useState(false);
  const [mostrarPartidos, setMostrarPartidos] = useState(true);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const mostrarEquiposHandler = () => {
    setMostrarEquipos(true);
    setMostrarPartidos(false);
    setMostrarResultados(false);
  };

  const mostrarPartidosHandler = () => {
    setMostrarEquipos(false);
    setMostrarPartidos(true);
    setMostrarResultados(false);
  };

  const mostrarResultadosHandler = () => {
    setMostrarEquipos(false);
    setMostrarPartidos(false);
    setMostrarResultados(true);
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <header className="text-center">
            <h1>¡Fifa mundia wrold club 2042!</h1>
            <p>Explora y gestiona tus partidos, equipos y resultados.</p>
            <Button
              variant="outline-danger"
              onClick={mostrarEquiposHandler}
              className={mostrarEquipos ? 'btn btn-outline-danger' : ''}
            >
              Agregar Equipos
            </Button>{' '}
            <Button
              variant="outline-danger"
              onClick={mostrarPartidosHandler}
              className={mostrarPartidos ? 'btn btn-outline-danger' : ''}
            >
              Agregar Partidos
            </Button>{' '}
            <Button
              variant="outline-danger"
              onClick={mostrarResultadosHandler}
              className={mostrarResultados ? 'btn btn-outline-danger' : ''}
            >
              Agregar Resultados
            </Button>
          </header>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <main>
            {mostrarEquipos && (
              <Card>
                <Card.Body>
                  <AgregarEquipo />
                </Card.Body>
              </Card>
            )}
             {mostrarPartidos && (
              <Card>
                <Card.Body>
                  <AgregarPartido />
                </Card.Body>
              </Card>
            )}
            {mostrarPartidos && <PartidosList />}
           
              {mostrarResultados && (
              <Card>
                <Card.Body>
                  <AgregarResultado />
                </Card.Body>
              </Card>
            )}
            {mostrarResultados && (
              <Card>
                <Card.Body>
                  <ResultadosList />
                </Card.Body>
              </Card>
            )}
          
            {mostrarEquipos && (
              <Card>
                <Card.Body>
                  <MostrarEquipos />
                </Card.Body>
              </Card>
            )}
            {/* Agrega más componentes según sea necesario */}
          </main>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
