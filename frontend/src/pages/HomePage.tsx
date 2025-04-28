import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Importamos el archivo CSS


import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div>
    <div
      className="position-relative"
      style={{
        backgroundImage: 'url("/homepage-portada2.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        color: "white",
      }}>
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

      {/* Sección de servicios de salud */}
      <section className="servicios-section bg-white">
      <div className="container py-5 text-center">
        {/* Encabezado */}
        <div className="row mb-5">
          <div className="col">
            <h1 className="servicios-title">Cuidando de tu salud</h1>
            <p className="servicios-descripcion">
              Conoce nuestros servicios
            </p>
          </div>
        </div>

        {/* Servicios */}
        <div className="row g-3">
          {/* Card 1 */}
          <div className="col-lg-3 col-md-6">
            <div className="card h-100">
              <div className="card-body text-center">
                <img
                  src=""
                  alt=""
                  className="staff-img"
                />
                <h4 className="staff-name">Titulo</h4>
                <h5 className="staff-cargo">Parrafo</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="p-4">
                    <a>
                     Texto
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Puedes continuar agregando más cards */}
        </div>
      </div>
    </section>


    </div>
  );
};

export default HomePage;