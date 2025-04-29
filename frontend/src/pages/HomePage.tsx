import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Importamos el archivo CSS


import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div className="container-fluid" style={{ padding: "0" }}>
    <div
      className="position-relative"
      style={{
        backgroundImage: 'url("/homepage-portada2.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
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
          <Link className="nav-link" to="/buscarmedico">
              Buscar Médicos
            </Link>
          </button>
      </div>
      </div>

      {/* Sección de servicios de salud */}
      <section id="servicios-homepage" className="servicios-section bg-white">
      <div className="container py-5 text-center">
        {/* Encabezado */}
        <div className="row mb-5">
          <div className="col">
            <h1 className="servicios-title">Cuidando de tu salud</h1>
            <p className="servicios-descripcion">Conoce nuestros servicios</p>
          </div>
        </div>

        {/* Servicios */}
        <div className="row g-3 justify-content-center">
          {/* Card 1 */}
          <div className="col-lg-3 col-md-6">
            <div className="card h-100">
              <div className="card-body text-center">
                <img src="/img-card1.png" alt="" className="img-fluid rounded-circle w-50 mb-3"></img>
                <h4 className="card-home-title">Reservas y Turnos</h4>
                <div className="d-flex flex-row justify-content-center">
                  <div className="card-home-text p-3">
                    <a>
                      Encuentra profesionales verificados y reserva tu turno en segundos. 
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Card 2 */}
            <div className="col-lg-3 col-md-6">
            <div className="card h-100">
              <div className="card-body text-center">
                <img src="/img-card2.png" alt="" className="img-fluid rounded-circle w-50 mb-3"></img>
                <h4 className="card-home-title">Experiencia personalizada</h4>
                <div className="d-flex flex-row justify-content-center">
                  <div className="card-home-text p-3">
                    <a>
                     Si sos un profesional de la salud, organizamos tu día a día con nuestro historial de turnos y recordatorios. 
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Card 3 */}
            <div className="col-lg-3 col-md-6">
            <div className="card h-100">
              <div className="card-body text-center">
                <img src="/img-card3.png" alt="" className="img-fluid rounded-circle w-50 mb-3"></img>
                <h4 className="card-home-title">Opciones de Pago</h4>
                <div className="d-flex flex-row justify-content-center">
                  <div className="card-home-text p-3">
                    <a>
                      Diferentes formas de pago y posibilidad de cancelación con 24 HS de anticipación. 
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section className="franja-violeta">
            <div className="container text-center">
                <p className="franja-texto"> &gt; Comenzá ahora y disfrutá de todos los beneficios &lt;</p>
            </div>
    </section>


    </div>
  );
};

export default HomePage;