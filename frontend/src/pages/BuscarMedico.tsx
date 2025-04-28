import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationUI from '../utils/PaginationUI';

const BuscarMedico = () => {
  // Datos estáticos de ejemplo
  const turnosEjemplo = [
    {
      id: '1',
      medico: 'Dr. García',
      especialidad: 'Cardiología',
      estado: 'disponible',
      pais: 'Argentina'
    },
    {
      id: '2',
      medico: 'Dra. López',
      especialidad: 'Dermatología',
      estado: 'inactivo',
      pais: 'Uruguay'
      
    },
    {
      id: '3',
      medico: 'Dr. Martínez',
      especialidad: 'Pediatría',
      estado: 'disponible',
      pais: 'Chile'
    }
  ];
  const currentPage = 1;
  const totalPages = 3;

  return (
    <div className="container container-formulario p-6 mb-4">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">
          <div className="card shadow-lg border-0 card-formulario">
            <div className="card-body p-4 row">
              <h2 className="card-title text-center mb-4 card-titulo">
                <span className="text-iniciar">Buscar</span>
                <span className="text-sesion"> Medicos</span>
              </h2>
              <div className="row mb-4 justify-content-center">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control input-formulario-buscarMedico"
                    placeholder="Buscar por nombre"
                    style={{ 
                      borderRadius: '8px',
                      border: '2px solid #ae5bbf',
                      height: '40px',
                      minWidth: '300px'
                    }}
                  />
                </div>
              </div>

              <div className='container row align-items-center'>
                <div className="col-auto">
                  <div className="mb-1">
                    <select 
                      className="form-select form-select-sm input-formulario"
                      style={{ 
                        borderRadius: '8px',
                        border: '2px solid #ae5bbf',
                        height: '40px',
                        color: 'green',
                      }}
                    >
                      <option selected value="1">Todas las especialidades</option>
                      <option value="2">Cardiología</option>
                      <option value="3">Dermatología</option>
                      <option value="4">Pediatría</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <select 
                      className="form-select form-select-sm input-formulario"
                      style={{ 
                        borderRadius: '8px',
                        border: '2px solid #ae5bbf',
                        height: '40px',
                        color: 'green',
                      }}
                    >
                      <option selected value="1">Todas las provincias</option>
                      <option value="2">Argentina</option>
                      <option value="3">Uruguay</option>
                      <option value="4">Chile</option>
                    </select>
                  </div>
                  <div className="mb-1">
                    <select 
                      className="form-select form-select-sm input-formulario"
                      style={{ 
                        borderRadius: '8px',
                        border: '2px solid #ae5bbf',
                        height: '40px',
                        color: 'green',
                      }}
                    >
                      <option selected value="1">Todas las obras sociales</option>
                      <option value="2">IOSCOR</option>
                      <option value="3">OSCHOCA </option>
                      <option value="4">Unión Personal</option>
                      <option value="5">OSMEDICA </option>
                      <option value="6">OSPRERA </option>
                      <option value="7">Sancord Salud</option>
                    </select>
                  </div>
                  
                </div>
                <div className="col-8 mb-4">
                  {/* Tabla de resultados */}
                  <div className="table-responsive">
                    <table className="table table-hover " style={{ borderColor: '#ae5bbf' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                          <th style={{ borderBottom: '2px solid #ae5bbf' }}>Médico</th>
                          <th style={{ borderBottom: '2px solid #ae5bbf' }}>Especialidad</th>
                          <th style={{ borderTopRightRadius: '8px', borderBottom: '2px solid #ae5bbf' }}>Estado</th>
                          <th style={{ borderBottom: '2px solid #ae5bbf' }}>Turnos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {turnosEjemplo.map((turno) => (
                          <tr key={turno.id}>
                            <td>{turno.medico}</td>
                            <td>{turno.especialidad}</td>
                            <td>
                              <span 
                                className={`badge ${turno.estado === 'disponible' ? 'bg-primary' : 'bg-danger'}`}
                                style={{ 
                                  padding: '6px 10px',
                                  borderRadius: '12px',
                                  fontSize: '0.85rem'
                                }}
                              >
                                {turno.estado}
                              </span>
                            </td>
                            <td>
                              <button className='btn btn-outline-success btn-sm py-1 px-3'>
                                Consultar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              
              {/* Componente de paginación reutilizable */}
              <PaginationUI 
                currentPage={currentPage}
                totalPages={totalPages}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuscarMedico;