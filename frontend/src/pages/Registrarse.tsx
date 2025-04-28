import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registrarse = () => {
const [tipoUsuario, setTipoUsuario] = useState('paciente'); 
const especialidades = ['Cardiología', 'Dermatología', 'Pediatría', 'Oftalmología', 'Neurología']; 
const obrasSociales = ['OSDE', 'Swiss Medical', 'Galeno', 'Medicus'];
const ciudades = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza']; 

    return (
        <div className="container container-formulario p-4">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 card-formulario">
                <div className="card-body p-4">
                <h2 className="card-title text-center mb-4 card-titulo">
                    <span className="text-iniciar">Crear</span> <span className="text-sesion">Cuenta</span>
                </h2>

                {/* Toggle Paciente / Médico */}
                <div className="d-flex justify-content-center mb-4">
                    <button
                    type="button"
                    className={`btn ${tipoUsuario === 'paciente' ? 'btn-success' : 'btn-outline-success'} mx-2`}
                    onClick={() => setTipoUsuario('paciente')}
                    >
                    Paciente
                    </button>
                    <button
                    type="button"
                    className={`btn ${tipoUsuario === 'medico' ? 'btn-success' : 'btn-outline-success'} mx-2`}
                    onClick={() => setTipoUsuario('medico')}
                    >
                    Médico
                    </button>
                </div>

                <form>

                {/* DNI */}
                <div className="mb-4">
                    <label htmlFor="dni_usuario" className="form-label label-formulario">DNI</label>
                    <input type="number" className="form-control input-formulario" id="dni_usuario" placeholder="DNI sin puntos"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} />
                </div>

                {/* Nombre y Apellido */}
                <div className="mb-4">
                    <label htmlFor="nombre_usuario" className="form-label label-formulario">Nombre</label>
                    <input type="text" className="form-control input-formulario" id="nombre_usuario" placeholder="Nombre"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} />
                </div>

                <div className="mb-4">
                    <label htmlFor="apellido_usuario" className="form-label label-formulario">Apellido</label>
                    <input type="text" className="form-control input-formulario" id="apellido_usuario" placeholder="Apellido"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="mb-4">
                    <label htmlFor="fecha_nac_usuario" className="form-label label-formulario">Fecha de Nacimiento</label>
                    <input type="date" className="form-control input-formulario" id="fecha_nac_usuario"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} />
                </div>

                {/* Celular */}
                <div className="mb-4">
                    <label htmlFor="celular_usuario" className="form-label label-formulario">Celular</label>
                    <input type="text" className="form-control input-formulario" id="celular_usuario" placeholder="Celular"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email_usuario" className="form-label label-formulario">Correo Electrónico</label>
                    <input type="email" className="form-control input-formulario" id="email_usuario" placeholder="usuario@ejemplo.com"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} />
                </div>

                {/* Contraseña */}
                <div className="mb-4">
                    <label htmlFor="clave_usuario" className="form-label label-formulario">Contraseña</label>
                    <input type="password" className="form-control input-formulario" id="clave_usuario" placeholder="Crea una contraseña"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} />
                </div>

                {/* Dirección */}
                <div className="mb-4">
                <label className="form-label label-formulario">Dirección</label>
                
                {/* Fila para Calle y Número */}
                <div className="row g-2 mb-2">
                    <div className="col-md-8">
                    <input 
                        type="text" 
                        className="form-control input-formulario" 
                        id="calle_usuario" 
                        placeholder="Calle"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    />
                    </div>
                    <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control input-formulario" 
                        id="num_usuario" 
                        placeholder="Número"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    />
                    </div>
                </div>

                {/* Fila para Departamento y Código Postal */}
                <div className="row g-2">
                    <div className="col-md-6">
                    <input 
                        type="text" 
                        className="form-control input-formulario" 
                        id="dpto_usuario" 
                        placeholder="Departamento (opcional)"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    />
                    </div>
                    <div className="col-md-6">
                    <input 
                        type="text" 
                        className="form-control input-formulario" 
                        id="cod_postal" 
                        placeholder="Código Postal"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    />
                    </div>
                </div>
                </div>
                {/* Ciudad */}
                <div className="mb-4">
                    <label htmlFor="id_ciudad" className="form-label label-formulario">Ciudad</label>
                    <select className="form-control input-formulario" id="id_ciudad"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }}>
                        <option value="">Seleccione una ciudad</option>
                        {ciudades.map((ciudad, index) => (
                        <option key={index} value={ciudad}>{ciudad}</option>
                        ))}
                    </select>
                </div>

                {/* Obra Social */}
                {tipoUsuario === 'paciente' && (
                    <div className="mb-4">
                        <label htmlFor="id_obra_social" className="form-label label-formulario">Obra Social</label>
                        <select className="form-control input-formulario" id="id_obra_social"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }}>
                        <option value="">Seleccione obra social</option>
                        {obrasSociales.map((obra, index) => (
                            <option key={index} value={obra}>{obra}</option>
                        ))}
                        </select>
                    </div>
                )}

                {/* Médico: Especialidades y Matrícula */}
                {tipoUsuario === 'medico' && (
                    <>
                        {/* Matrícula */}
                        <div className="mb-4">
                        <label htmlFor="matricula_medico" className="form-label label-formulario">Matrícula Profesional</label>
                        <input type="text" className="form-control input-formulario" id="matricula_medico" placeholder="Número de Matrícula"
                            style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} />
                        </div>

                        {/* Especialidades */}
                        <div className="mb-4">
                            <label htmlFor="id_especialidad" className="form-label label-formulario">Ciudad</label>
                            <select className="form-control input-formulario" id="id_especialidad"
                                style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }}>
                                <option value="">Seleccione una especialidad</option>
                                {especialidades.map((especialidad, index) => (
                                <option key={index} value={especialidad}>{especialidad}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                {/* Botón REGISTRARSE */}
                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="boton-ingresar">
                            REGISTRARSE
                        </button>
                    </div>
                </form>

                {/* Separador */}
                <div className="separador-formulario">
                    <div className="linea-separador"></div>
                    <span className="texto-separador">o</span>
                    <div className="linea-separador"></div>
                </div>

              {/* Link a login */}
                <div className="mt-4 text-center">
                    <p className="mt-3 mb-0 texto-registro">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="enlace-registro">Inicia sesión aquí</Link>
                    </p>
                </div>

                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Registrarse;
