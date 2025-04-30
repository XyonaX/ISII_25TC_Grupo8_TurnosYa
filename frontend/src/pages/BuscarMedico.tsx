import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationUI from '../utils/PaginationUI';
import { dataService } from '../services/userServices'; // Importar dataService
import { Especialidad, ObraSocial } from '../types/userTypes'; // Importar tipos


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
  const [especialidadesOptions, setEspecialidadesOptions] = useState<Especialidad[]>([]);
  const [obrasSocialesOptions, setObrasSocialesOptions] = useState<ObraSocial[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true); // Estado de carga para las opciones


  // Cargar médicos desde backend
  useEffect(() => {
    const fetchData  = async () => {
      try {
        setLoading(true);
        setLoadingOptions(true);
        
        // Usar dataService.getMedicos() en lugar de axios.get directo
        const medicosResponse = await dataService.getMedicos();
        setMedicos(medicosResponse);

        // Cargar especialidades
        const especialidadesResponse = await dataService.getEspecialidades();
        setEspecialidadesOptions(especialidadesResponse);

        // Cargar obras sociales
        const obrasSocialesResponse = await dataService.getObrasSociales();
        setObrasSocialesOptions(obrasSocialesResponse);

      } catch (err) {
        console.error('Error al traer datos:', err);
        setError('Error al cargar los datos. Intente nuevamente más tarde.');
      } finally {
        setLoading(false);
        setLoadingOptions(false); // Finalizar carga de opciones
      }
    };

    fetchData();
  }, []);

  const availableSpecialtyNames = useMemo(() => {
    return new Set(medicos.map(medico => medico.especialidad));
  }, [medicos]); // Recalculate only when the 'medicos' list changes

  const availableObrasSocialesNames = useMemo(() => {
    return new Set(medicos.map(medico => medico.obraSocial));
  }, [medicos]); // Recalculate only when the 'medicos' list changes

  // Lógica de filtrado actualizada
  const medicosFiltrados = medicos.filter((medico) => {
    const coincideNombre = medico.medico.toLowerCase().includes(nombreFiltro.toLowerCase());
    const coincideEspecialidad = especialidadFiltro === 'Especialidades' || medico.especialidad === especialidadFiltro;
    const coincideObraSocial = obraSocialFiltro === 'Obras Sociales' || medico.obraSocial === obraSocialFiltro;

    return coincideNombre && coincideEspecialidad && coincideObraSocial;
  });

  // Mostrar spinner si se está cargando médicos O las opciones de los dropdowns
  if (loading || loadingOptions) {
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
                  {/* Especialidades - Ahora cargadas desde backend, styled based on availability */}
                  <div className="mb-1">
                    <select
                      className="form-select form-select-sm input-formulario"
                      value={especialidadFiltro}
                      onChange={(e) => setEspecialidadFiltro(e.target.value)}
                      style={{
                        borderRadius: '8px',
                        border: '2px solid #ae5bbf',
                        height: '40px',
                        color: 'green', // Default color for the select itself
                      }}
                    >
                      {/* Opción por defecto */}
                      <option value="Especialidades">Especialidades</option>
                      {/* Opciones cargadas desde el backend */}
                      {especialidadesOptions.map(esp => {
                        // Check if this specialty name exists in the set of available specialties from doctors
                        const isAvailable = availableSpecialtyNames.has(esp.nombre_especialidad);
                        return (
                          <option
                            key={esp._id}
                            value={esp.nombre_especialidad}
                            // Apply a style to make it grey if not available
                            style={{ color: isAvailable ? 'green' : 'grey' }}
                            // Do NOT use 'disabled' if you want them to be selectable but visually different
                            // disabled={!isAvailable}
                          >
                            {esp.nombre_especialidad}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Obras Sociales - Ahora cargadas desde los médicos */}
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
                       {/* Opción por defecto */}
                      <option value="Obras Sociales">Obras Sociales</option>
                      {/* Opciones cargadas desde los médicos */}
                      {obrasSocialesOptions.map(esp => {
                        // Use the specialty name directly as the key and value
                        const isAvailable = availableObrasSocialesNames.has(esp.nombre_obra_social);
                        return (
                          <option
                            key={esp._id}
                            value={esp.nombre_obra_social}
                            // Apply a style to make it grey if not available
                            style={{ color: isAvailable ? 'green' : 'grey' }}
                            // Do NOT use 'disabled' if you want them to be selectable but visually different
                            // disabled={!isAvailable}
                          >
                            {esp.nombre_obra_social}
                          </option>
                        );
                    })}
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