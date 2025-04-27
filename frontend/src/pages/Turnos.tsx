import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <select className="form-select" disabled>
            <option>Todas las especialidades</option>
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" disabled>
            <option>Todos los estados</option>
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

      {/* Paginación (sin funcionalidad) */}
      <nav>
        <ul className="pagination justify-content-center mt-4">
          <li className="page-item active">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Turnos;