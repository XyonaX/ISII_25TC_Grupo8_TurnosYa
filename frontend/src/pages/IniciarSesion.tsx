import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle } from 'react-icons/fa'; // Importamos el ícono de Google

const IniciarSesion = () => {

  return (
    <div className="container mt-6" style={{ minHeight: 'calc(100vh - 245px)' }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0" style={{ 
            borderRadius: '15px',
            border: '2px solid #04a658'
          }}>
            <div className="card-body p-4">
              {/* Título con los colores de tu marca */}
              <h2 className="card-title text-center mb-4" style={{ 
                fontSize: '2rem',
                fontFamily: "'Trebuchet MS', sans-serif"
              }}>
                <span style={{ color: '#ae5bbf' }}>Iniciar</span>
                <span style={{ color: '#04a658' }}> Sesión</span>
              </h2>
              
              {/* Formulario tradicional */}
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold" style={{ color: '#04a658' }}>
                    Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    className="form-control py-2" 
                    id="email" 
                    placeholder="usuario@ejemplo.com"
                    style={{ 
                      borderRadius: '8px',
                      border: '2px solid #ae5bbf'
                    }}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold" style={{ color: '#04a658' }}>
                    Contraseña
                  </label>
                  <input 
                    type="password" 
                    className="form-control py-2" 
                    id="password" 
                    placeholder="Ingrese su contraseña"
                    style={{ 
                      borderRadius: '8px',
                      border: '2px solid #ae5bbf'
                    }}
                  />
                </div>
                
                {/* Botón con los colores de tu marca */}
                <div className="d-grid gap-2 mb-3">
                  <button 
                    type="submit" 
                    className="btn py-2 fw-bold" 
                    style={{ 
                      backgroundColor: '#ae5bbf',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '1.1rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9a4aad'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ae5bbf'}
                  >
                    INGRESAR
                  </button>
                </div>
              </form>

              {/* Separador */}
              <div className="d-flex align-items-center mb-4">
                <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
                <span className="mx-3" style={{ color: '#777' }}>o</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
              </div>
              
              {/* Botón de Google */}
              <div className="d-grid gap-2 mb-4">
                <button 
                  type="button"
                  className="btn py-2 fw-bold d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: '#ffffff',
                    color: '#757575',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f8f8';
                    e.currentTarget.style.boxShadow = '0 2px 5px rgba(166, 110, 176, 0.64)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <FaGoogle style={{ color: '#5682e8', fontSize: '1.2rem', marginRight: '10px' }} />
                  Continuar con Google
                </button>
              </div>

              {/* Enlaces adicionales */}
              <div className="mt-4 text-center">
                <p className="mt-3 mb-0" style={{ color: '#555' }}>
                  ¿No tienes cuenta?{' '}
                  <a 
                    href="#!" 
                    className="text-decoration-none fw-bold" 
                    style={{ color: '#04a658' }}
                  >
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;