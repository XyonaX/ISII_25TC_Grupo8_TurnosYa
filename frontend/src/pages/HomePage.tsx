import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div
      className="position-relative"
      style={{
        backgroundImage: 'url("/homepage-portada2.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        color: "white",
      }}
    >
      <div
        className="position-absolute top-50 start-0 translate-middle-y text-start"
        style={{ textShadow: "0 2px 4px rgba(165, 192, 161, 0.7)", paddingLeft: "2rem",}}>
        <h1
          style={{ fontFamily: "Verdana, sans-serif", marginBottom: "1rem",}}
          className="display-4 fw-bold"
        > Agenda tu cita
        </h1>
        <p style={{ marginBottom: "1.5rem", }}className="fs-5">Encontrá tu especialista y pedí un turno</p>
        <button className="custom-button">
          <Link className="nav-link" to="/turnos">
              Buscar Médicos
            </Link>
          </button>
      </div>
    </div>
  );
};

export default HomePage;