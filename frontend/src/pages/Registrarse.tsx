import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authService, dataService } from '../services/userServices';
import { RegisterFormData, RegisterErrors, Ciudad, ObraSocial, Especialidad } from '../types/userTypes';

const Registrarse = () => {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState<'paciente' | 'medico'>('paciente');
  const [formData, setFormData] = useState<RegisterFormData>({
    dni_usuario: '',
    nombre_usuario: '',
    apellido_usuario: '',
    fecha_nac_usuario: '',
    celular_usuario: '',
    email_usuario: '',
    clave_usuario: '',
    calle_usuario: '',
    num_usuario: '',
    cod_postal: '',
    id_ciudad: '5f8d0d55b54764421b7156b6',
    id_estado_usuario: '5f8d0d55b54764421b7156b7', // Asumimos que '1' es el estado activo por defecto
    tipo_usuario: 'medico',
    
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Datos para los selects
  const especialidades = ['Cardiología', 'Dermatología', 'Pediatría', 'Oftalmología', 'Neurología']; 
  const obrasSociales = ['OSDE', 'Swiss Medical', 'Galeno', 'Medicus'];
  const ciudades = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEspecialidadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormData(prev => ({
      ...prev,
      especialidades: options
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

    try {
      const userToSend = {
        ...formData,
        tipo_usuario: tipoUsuario,
        ...(tipoUsuario === 'paciente' ? { 
          id_obra_social: formData.id_obra_social,
          matricula_medico: undefined,
          especialidades: undefined
        } : {
          matricula_medico: formData.matricula_medico,
          especialidades: formData.especialidades,
          id_obra_social: undefined
        })
      };
      // Llamar al servicio de registro
      const response = await authService.register(userToSend);
      
      if (response) {
        navigate('/registro');
      }
    } catch (error: any) {
      console.error('Error en registro:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: error.message || 'Ocurrió un error durante el registro' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando datos necesarios...</p>
      </div>
    );
  }

    return (
        <div className='container container-formulario p-4'>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    <div className='card shadow-lg border-0 card-formulario'>
                        <div className='card-body p-4'>
                            <h2 className='card-title text-center mb-4 card-titulo'>
                                <span className='text-iniciar'>Crear</span>{" "}
                                <span className='text-sesion'>Cuenta</span>
                            </h2>

                            {errors.general && (
                                <div className='alert alert-danger'>
                                    {errors.general}
                                </div>
                            )}

              {/* Toggle Paciente / Médico */}
              <div className="d-flex justify-content-center mb-2">
                <button
                  type="button"
                  className={`btn ${tipoUsuario === 'paciente' ? 'btn-success' : 'btn-outline-success'} mx-2`}
                  onClick={() => {
                    setTipoUsuario('paciente');
                    setFormData(prev => ({
                      ...prev,
                      tipo_usuario: 'paciente'
                    }));
                  }}
                >
                  Paciente
                </button>
                <button
                  type="button"
                  className={`btn ${tipoUsuario === 'medico' ? 'btn-success' : 'btn-outline-success'} mx-2`}
                  onClick={() => {
                    setTipoUsuario('medico');
                    setFormData(prev => ({
                      ...prev,
                      tipo_usuario: 'medico'
                    }));
                  }}
                >
                  Médico
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* DNI */}
                <div className="mb-2">
                  <label htmlFor="dni_usuario" className="form-label label-formulario">DNI</label>
                  <input 
                    type="text" 
                    className="form-control input-formulario" 
                    id="dni_usuario" 
                    name="dni_usuario"
                    value={formData.dni_usuario}
                    onChange={handleChange}
                    placeholder="DNI sin puntos"
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    required
                  />
                  {errors.dni_usuario && <small className="text-danger">{errors.dni_usuario}</small>}
                </div>

                {/* Nombre y Apellido */}
                <div className="mb-2">
                  <label htmlFor="nombre_usuario" className="form-label label-formulario">Nombre</label>
                  <input 
                    type="text" 
                    className="form-control input-formulario" 
                    id="nombre_usuario" 
                    name="nombre_usuario"
                    value={formData.nombre_usuario}
                    onChange={handleChange}
                    placeholder="Nombre"
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    required
                  />
                  {errors.nombre_usuario && <small className="text-danger">{errors.nombre_usuario}</small>}
                </div>

                <div className="mb-2">
                  <label htmlFor="apellido_usuario" className="form-label label-formulario">Apellido</label>
                  <input 
                    type="text" 
                    className="form-control input-formulario" 
                    id="apellido_usuario" 
                    name="apellido_usuario"
                    value={formData.apellido_usuario}
                    onChange={handleChange}
                    placeholder="Apellido"
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    required
                  />
                  {errors.apellido_usuario && <small className="text-danger">{errors.apellido_usuario}</small>}
                </div>

                {/* Fecha de Nacimiento */}
                <div className="mb-2">
                  <label htmlFor="fecha_nac_usuario" className="form-label label-formulario">Fecha de Nacimiento</label>
                  <input 
                    type="date" 
                    className="form-control input-formulario" 
                    id="fecha_nac_usuario"
                    name="fecha_nac_usuario"
                    value={formData.fecha_nac_usuario as string}
                    onChange={handleChange}
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    required
                  />
                  {errors.fecha_nac_usuario && (
                    <small className="text-danger">{String(errors.fecha_nac_usuario)}</small>
                  )}
                </div>

                {/* Celular */}
                <div className="mb-2">
                  <label htmlFor="celular_usuario" className="form-label label-formulario">Celular</label>
                  <input 
                    type="text" 
                    className="form-control input-formulario" 
                    id="celular_usuario" 
                    name="celular_usuario"
                    value={formData.celular_usuario}
                    onChange={handleChange}
                    placeholder="Celular"
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    required
                  />
                  {errors.celular_usuario && <small className="text-danger">{errors.celular_usuario}</small>}
                </div>

                {/* Email */}
                <div className="mb-2">
                  <label htmlFor="email_usuario" className="form-label label-formulario">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control input-formulario" 
                    id="email_usuario" 
                    name="email_usuario"
                    value={formData.email_usuario}
                    onChange={handleChange}
                    placeholder="usuario@ejemplo.com"
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    required
                  />
                  {errors.email_usuario && <small className="text-danger">{errors.email_usuario}</small>}
                </div>

                {/* Contraseña */}
                <div className="mb-2">
                  <label htmlFor="clave_usuario" className="form-label label-formulario">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control input-formulario" 
                    id="clave_usuario" 
                    name="clave_usuario"
                    value={formData.clave_usuario}
                    onChange={handleChange}
                    placeholder="Crea una contraseña"
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                    required
                  />
                  {errors.clave_usuario && <small className="text-danger">{errors.clave_usuario}</small>}
                </div>

                {/* Dirección */}
                <div className=" mb-2">
                  <label className="form-label label-formulario">Dirección</label>
                  
                  {/* Fila para Calle y Número */}
                  <div className="row g-2 mb-2">
                    <div className="col-sm-8 col-md-6">
                      <input 
                        type="text" 
                        className="form-control input-formulario" 
                        id="calle_usuario" 
                        name="calle_usuario"
                        value={formData.calle_usuario}
                        onChange={handleChange}
                        placeholder="Calle"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                        required
                      />
                      {errors.calle_usuario && <small className="text-danger">{errors.calle_usuario}</small>}
                    </div>
                    <div className="col-sm-4 col-md-2">
                      <input 
                        type="text" 
                        className="form-control input-formulario" 
                        id="num_usuario" 
                        name="num_usuario"
                        value={formData.num_usuario}
                        onChange={handleChange}
                        placeholder="Número"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                        required
                      />
                      {errors.num_usuario && <small className="text-danger">{errors.num_usuario}</small>}
                    </div>
                  </div>

                  {/* Fila para Departamento y Código Postal */}
                  <div className="row g-2">
                    <div className="col-sm-8 col-md-2">
                      <input 
                        type="text" 
                        className="form-control input-formulario" 
                        id="dpto_usuario" 
                        name="dpto_usuario"
                        value={formData.dpto_usuario || ''}
                        onChange={handleChange}
                        placeholder="Departamento (opcional)"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                      />
                    </div>
                    <div className="col-sm-4 col-md-2">
                      <input 
                        type="text" 
                        className="form-control input-formulario" 
                        id="cod_postal" 
                        name="cod_postal"
                        value={formData.cod_postal}
                        onChange={handleChange}
                        placeholder="Código Postal"
                        style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }} 
                        required
                      />
                      {errors.cod_postal && <small className="text-danger">{errors.cod_postal}</small>}
                    </div>
                  </div>
                </div>
              {/* Ciudad */}
              <div className="mb-2">
                <label htmlFor="id_ciudad" className="form-label label-formulario">Ciudad</label>
                <select 
                  className="form-control input-formulario" 
                  id="id_ciudad"
                  name="id_ciudad"
                  value={formData.id_ciudad}
                  onChange={handleChange}
                  style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }}
                  required
                >
                  <option value="">Seleccione una ciudad</option>
                  {ciudades.map(ciudad => (
                    <option key={ciudad._id} value={ciudad._id}>{ciudad.nombre_ciudad}</option>
                  ))}
                </select>
                {errors.id_ciudad && <small className="text-danger">
  {typeof errors.id_ciudad === 'string' 
    ? errors.id_ciudad 
    : errors.id_ciudad?.message}
</small>
}
              </div>

              {/* Obra Social */}
              {tipoUsuario === 'paciente' && (
                <div className="mb-3">
                  <label htmlFor="id_obra_social" className="form-label label-formulario">Obra Social</label>
                  <select 
                    className="form-control input-formulario" 
                    id="id_obra_social"
                    name="id_obra_social"
                    value={formData.id_obra_social}
                    onChange={handleChange}
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf' }}
                    required
                  >
                    <option value="">Seleccione obra social</option>
                    {obrasSociales.map(obra => (
                      <option key={obra._id} value={obra._id}>{obra.nombre_obra_social}</option>
                    ))}
                  </select>
                  {errors.id_obra_social && <small className="text-danger">{errors.id_obra_social}</small>}
                </div>
              )}

              {/* Especialidades */}
              {tipoUsuario === 'medico' && (
                <div className="mb-4">
                  <label htmlFor="especialidades" className="form-label label-formulario">Especialidades</label>
                  <select 
                    multiple
                    className="form-control input-formulario" 
                    id="especialidades"
                    name="especialidades"
                    value={formData.especialidades || []}
                    onChange={handleEspecialidadChange}
                    style={{ borderRadius: '8px', border: '2px solid #ae5bbf', height: 'auto' }}
                    required
                  >
                    {especialidadesMedicas.map((especialidad) => (
                      <option key={especialidad._id} value={especialidad._id}>
                        {especialidad.nombre_especialidad}
                      </option>
                    ))}
                  </select>
                  <small className="text-muted">Mantén presionado Ctrl para seleccionar múltiples especialidades</small>
                  {errors.especialidades && <small className="text-danger">{errors.especialidades}</small>}
                </div>
              )}


                                <div className='d-grid gap-2 mb-3'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Registrando..."
                                            : "REGISTRARSE"}
                                    </button>
                                </div>
                            </form>

                            <div className='mt-4 text-center'>
                                <p>
                                    ¿Ya tienes cuenta?{" "}
                                    <Link to='/login'>Inicia sesión aquí</Link>
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
