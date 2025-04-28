import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle } from 'react-icons/fa'; // Importamos el ícono de Google

const IniciarSesion = () => {

  return (
    <div className="container container-formulario p-4">
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-6">
      <div className="card shadow-lg border-0 card-formulario">
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4 card-titulo">
            <span className="text-iniciar">Iniciar</span>
            <span className="text-sesion"> Sesión</span>
          </h2>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="form-label label-formulario">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                className="form-control input-formulario" 
                id="email" 
                placeholder="usuario@ejemplo.com"
                style={{ 
                  borderRadius: '8px',
                  border: '2px solid #ae5bbf'
                }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label label-formulario">
                Contraseña
              </label>
              <input 
                type="password" 
                className="form-control input-formulario" 
                id="password" 
                placeholder="Ingrese su contraseña"
                style={{ 
                  borderRadius: '8px',
                  border: '2px solid #ae5bbf'
                }}
              />
            </div>

            <div className="d-grid gap-2 mb-3">
              <button 
                type="submit" 
                className="boton-ingresar"
              >
                INGRESAR
              </button>
            </div>
          </form>

          <div className="separador-formulario">
            <div className="linea-separador"></div>
            <span className="texto-separador">o</span>
            <div className="linea-separador"></div>
          </div>

          <div className="d-grid gap-2 mb-4">
            <button 
              type="button"
              className="boton-google"
            >
              <FaGoogle className="icono-google" />
              Continuar con Google
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="mt-3 mb-0 texto-registro">
              ¿No tienes cuenta?{' '}
              <Link
                  to="/registro"
                  className="enlace-registro"
              >
                Regístrate aquí
              </Link>
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