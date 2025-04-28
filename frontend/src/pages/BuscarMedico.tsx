import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationUI from '../utils/PaginationUI';

const BuscarMedico = () => {
  // Datos estáticos de ejemplo
  const turnosEjemplo = [
    {
      id: '1',
      fecha: '2023-05-20 10:00',
      medico: 'Dr. García',
      especialidad: 'Cardiología',
      estado: 'disponible'
    },
    {
      id: '2',
      fecha: '2023-05-20 11:00',
      medico: 'Dra. López',
      especialidad: 'Dermatología',
      estado: 'reservado'
    },
    {
      id: '3',
      fecha: '2023-05-21 09:30',
      medico: 'Dr. Martínez',
      especialidad: 'Pediatría',
      estado: 'disponible'
    }
  ];
  const currentPage = 1;
  const totalPages = 3;

  return (
    <div className="container container-formulario p-4">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">
          <div className="card shadow-lg border-0 card-formulario">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4 card-titulo">
                <span className="text-iniciar">Buscar</span>
                <span className="text-sesion"> Medicos</span>
              </h2>
              <div className="row mb-4">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control input-formulario-buscarMedico"
                    placeholder="Buscar por nombre"
                    style={{ 
                      borderRadius: '8px',
                      border: '2px solid #ae5bbf',
                      height: '40px',
                      
                    }}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-3 mb-2">
                  <select 
                    className="form-select input-formulario"
                    style={{ 
                      borderRadius: '8px',
                      border: '2px solid #ae5bbf',
                      height: '40px',
                      color: 'green',
                    }}
                  >
                    <option>Todas las especialidades</option>
                    <option>Cardiología</option>
                    <option>Dermatología</option>
                  </select>
                </div>
                <div className="col-md-3 mb-2">
                  <select 
                    className="form-select input-formulario"
                    style={{ 
                      borderRadius: '8px',
                      border: '2px solid #ae5bbf',
                      height: '40px',
                      color: 'green',
                    }}
                  >
                    <option>Todas las provincias</option>
                    <option>Cardiología</option>
                    <option>Dermatología</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select 
                    className="form-select input-formulario"
                    style={{ 
                      borderRadius: '8px',
                      border: '2px solid #ae5bbf',
                      height: '40px',
                      color: 'green',
                    }}
                  >
                    <option>Todas las obras sociales</option>
                    <option>IOSCOR</option>
                    <option>OSCHOCA </option>
                    <option>Unión Personal</option>
                    <option>OSMEDICA </option>
                    <option>OSPRERA </option>
                    <option>Sancord Salud</option>
                  </select>
                </div>
              </div>

              {/* Tabla de resultados */}
              <div className="table-responsive">
                <table className="table table-hover" style={{ borderColor: '#ae5bbf' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ borderTopLeftRadius: '8px', borderBottom: '2px solid #ae5bbf' }}>Fecha y Hora</th>
                      <th style={{ borderBottom: '2px solid #ae5bbf' }}>Médico</th>
                      <th style={{ borderBottom: '2px solid #ae5bbf' }}>Especialidad</th>
                      <th style={{ borderTopRightRadius: '8px', borderBottom: '2px solid #ae5bbf' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turnosEjemplo.map((turno) => (
                      <tr key={turno.id}>
                        <td>{turno.fecha}</td>
                        <td>{turno.medico}</td>
                        <td>{turno.especialidad}</td>
                        <td>
                          <span 
                            className={`badge ${turno.estado === 'disponible' ? 'bg-success' : 'bg-danger'}`}
                            style={{ 
                              padding: '6px 10px',
                              borderRadius: '12px',
                              fontSize: '0.85rem'
                            }}
                          >
                            {turno.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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