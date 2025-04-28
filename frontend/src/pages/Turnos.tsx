import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationUI from '../utils/PaginationUI';

const Turnos = () => {
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
    <div className="container mt-4">
      <h2 className="mb-4">Buscar Turnos</h2>

      {/* Barra de búsqueda (sin funcionalidad) */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por médico o especialidad"
          disabled
        />
      </div>

      {/* Filtros (sin funcionalidad) */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <select className="form-select" >
            <option>Todas las especialidades</option>
            <option>Cardiología</option>
            <option>Dermatología</option>
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" >
            <option>Todos los estados</option>
            <option>Disponible</option>
            <option>Reservado</option>
          </select>
        </div>
      </div>

      {/* Tabla de resultados */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Médico</th>
              <th>Especialidad</th>
              <th>Estado</th>
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
        disabled={true} // Deshabilitado para vista estática
      />
    </div>
  );
};

export default Turnos;