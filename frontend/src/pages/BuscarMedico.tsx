import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationUI from '../utils/PaginationUI';

interface Medico {
  id: string;
  medico: string;
  especialidad: string;
  obraSocial: string;
  estado: string;
  matricula?: string;
}

const BuscarMedico = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para filtros
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [especialidadFiltro, setEspecialidadFiltro] = useState('Especialidades');
  const [obraSocialFiltro, setObraSocialFiltro] = useState('Obras Sociales');
  
  // Obtener opciones únicas para los filtros
  const especialidadesUnicas = ['Especialidades', ...new Set(medicos.map(m => m.especialidad))];
  const obrasSocialesUnicas = ['Obras Sociales', ...new Set(medicos.map(m => m.obraSocial))];

  // Cargar médicos desde backend
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/medicos');
        setMedicos(response.data);
      } catch (err) {
        console.error('Error al traer los médicos:', err);
        setError('Error al cargar los médicos. Intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);

  // Lógica de filtrado actualizada
  const medicosFiltrados = medicos.filter((medico) => {
    const coincideNombre = medico.medico.toLowerCase().includes(nombreFiltro.toLowerCase());
    const coincideEspecialidad = especialidadFiltro === 'Especialidades' || medico.especialidad === especialidadFiltro;
    const coincideObraSocial = obraSocialFiltro === 'Obras Sociales' || medico.obraSocial === obraSocialFiltro;
    
    return coincideNombre && coincideEspecialidad && coincideObraSocial;
  });

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando médicos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container alert alert-danger mt-5">
        {error}
      </div>
    );
  }

  return (
    <div className="container container-formulario p-6 mb-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">
          <div className="card shadow-lg border-0 card-formulario">
            <div className="card-body p-4 row">
              <h2 className="card-title text-center mb-4 card-titulo">
                <span className="text-iniciar">Buscar</span>
                <span className="text-sesion"> Médicos</span>
              </h2>

              {/* Input de búsqueda por nombre */}
              <div className="row mb-4 justify-content-center">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control input-formulario-buscarMedico"
                    placeholder="Buscar por nombre"
                    value={nombreFiltro}
                    onChange={(e) => setNombreFiltro(e.target.value)}
                    style={{ 
                      borderRadius: '8px',
                      border: '2px solid #ae5bbf',
                      height: '40px',
                      minWidth: '300px'
                    }}
                  />
                </div>
              </div>

              {/* Filtros adicionales */}
              <div className='container row align-items-center'>
                <div className="col-auto">
                  {/* Especialidades - Ahora dinámico */}
                  <div className="mb-1">
                    <select 
                      className="form-select form-select-sm input-formulario"
                      value={especialidadFiltro}
                      onChange={(e) => setEspecialidadFiltro(e.target.value)}
                      style={{ 
                        borderRadius: '8px',
                        border: '2px solid #ae5bbf',
                        height: '40px',
                        color: 'green',
                      }}
                    >
                      {especialidadesUnicas.map(esp => (
                        <option key={esp} value={esp}>{esp}</option>
                      ))}
                    </select>
                  </div>

                  {/* Obras Sociales - Ahora dinámico */}
                  <div className="mb-1">
                    <select 
                      className="form-select form-select-sm input-formulario"
                      value={obraSocialFiltro}
                      onChange={(e) => setObraSocialFiltro(e.target.value)}
                      style={{ 
                        borderRadius: '8px',
                        border: '2px solid #ae5bbf',
                        height: '40px',
                        color: 'green',
                      }}
                    >
                      {obrasSocialesUnicas.map(os => (
                        <option key={os} value={os}>{os}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tabla de resultados */}
                <div className="col-auto mb-4">
                  <div className="table-responsive">
                    <table className="table table-hover" style={{ borderColor: '#ae5bbf' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                          <th style={{ borderBottom: '2px solid #ae5bbf' }}>Médico</th>
                          <th style={{ borderBottom: '2px solid #ae5bbf' }}>Especialidad</th>
                          <th style={{ borderBottom: '2px solid #ae5bbf' }}>Obra Social</th>
                          <th style={{ borderBottom: '2px solid #ae5bbf' }}>Estado</th>
                          <th style={{ borderBottom: '2px solid #ae5bbf' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicosFiltrados.map((medico) => (
                          <tr key={medico.id}>
                            <td>{medico.medico}</td>
                            <td>{medico.especialidad}</td>
                            <td>{medico.obraSocial}</td>
                            <td>
                              <span 
                                className={`badge ${medico.estado === 'disponible' ? 'bg-primary' : 'bg-danger'}`}
                                style={{ padding: '6px 10px', borderRadius: '12px', fontSize: '0.85rem' }}
                              >
                                {medico.estado}
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
                    {medicosFiltrados.length === 0 && (
                      <div className="alert alert-info text-center">
                        No se encontraron médicos con los filtros aplicados
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Componente de paginación */}
              <PaginationUI 
                currentPage={1}
                totalPages={Math.ceil(medicosFiltrados.length / 10)}
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuscarMedico;