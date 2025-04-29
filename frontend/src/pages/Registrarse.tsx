import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { authService, dataService } from "../services/userServices";
import { RegisterFormData, RegisterErrors } from "../types/userTypes";
import TipoUsuarioButton from "../components/TipoUsuarioBoton";
import EspecialidadInput from "../components/EspecialidadInput";
import ObraSocialInput from "../components/ObraSocialInput";

const Registrarse = () => {
    const navigate = useNavigate();
    const [tipoUsuario, setTipoUsuario] = useState<"paciente" | "medico">("paciente");
    const [formData, setFormData] = useState<Partial<RegisterFormData>>({
        dni_usuario: "",
        nombre_usuario: "",
        apellido_usuario: "",
        fecha_nac_usuario: "",
        celular_usuario: "",
        email_usuario: "",
        clave_usuario: "",
        calle_usuario: "",
        num_usuario: "",
        cod_postal: "",
        id_ciudad: "",
        id_estado_usuario: "5f8d0d55b54764421b7156b7", // Asumiendo que este es un valor por defecto
        especialidades: [],
        matricula_medico: "",
        id_obra_social: "",
    });

    const [errors, setErrors] = useState<RegisterErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [especialidades, setEspecialidades] = useState<{_id: string, nombre_especialidad: string}[]>([]);
    const [obrasSociales, setObrasSociales] = useState<{_id: string, nombre_obra_social: string}[]>([]);
    const [ciudades, setCiudades] = useState<{_id: string, nombre_ciudad: string}[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    // Cargar datos dinámicos al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // Obtener todas las datos necesarios en paralelo
                const [especialidadesRes, obrasSocialesRes, ciudadesRes] = await Promise.all([
                    dataService.getEspecialidades(),
                    dataService.getObrasSociales(),
                    dataService.getCiudades()
                ]);
                
                setEspecialidades(especialidadesRes);
                setObrasSociales(obrasSocialesRes);
                setCiudades(ciudadesRes);
                
                // Establecer un valor por defecto para la ciudad si es necesario
                if (ciudadesRes.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        id_ciudad: ciudadesRes[0]._id
                    }));
                }
                
            } catch (error) {
                console.error("Error cargando datos:", error);
                setErrors({
                    general: "Error al cargar los datos necesarios para el registro"
                });
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
    
        // Validar que todos los campos requeridos estén presentes
        const requiredFields: (keyof RegisterFormData)[] = [
            'dni_usuario', 'nombre_usuario', 'apellido_usuario', 'fecha_nac_usuario',
            'celular_usuario', 'email_usuario', 'clave_usuario', 'calle_usuario',
            'num_usuario', 'cod_postal', 'id_ciudad', 'id_estado_usuario'
        ];
    
        const missingFields = requiredFields.filter(field => !formData[field]);
    
        if (missingFields.length > 0) {
            setErrors({
                general: `Faltan campos requeridos: ${missingFields.join(', ')}`
            });
            setIsSubmitting(false);
            return;
        }
    
        try {
            // Crear objeto con todos los campos requeridos
            const userToSend: RegisterFormData = {
                dni_usuario: formData.dni_usuario!,
                nombre_usuario: formData.nombre_usuario!,
                apellido_usuario: formData.apellido_usuario!,
                fecha_nac_usuario: formData.fecha_nac_usuario!,
                celular_usuario: formData.celular_usuario!,
                email_usuario: formData.email_usuario!,
                clave_usuario: formData.clave_usuario!,
                calle_usuario: formData.calle_usuario!,
                num_usuario: formData.num_usuario!,
                cod_postal: formData.cod_postal!,
                id_ciudad: formData.id_ciudad!,
                id_estado_usuario: formData.id_estado_usuario!,
                tipo_usuario: tipoUsuario,
                // Campos condicionales
                ...(tipoUsuario === 'medico' && {
                    matricula_medico: formData.matricula_medico!,
                    especialidades: formData.especialidades ? [formData.especialidades[0]] : []
                }),
                ...(tipoUsuario === 'paciente' && {
                    id_obra_social: formData.id_obra_social!
                })
            };
    
            const response = await authService.register(userToSend);
            // ... resto del código
        } catch (error) {
            // ... manejo de errores
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="container mt-5">Cargando datos necesarios...</div>;
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

                            {successMessage && (
                                <div
                                    className='alert alert-success'
                                    role='alert'
                                >
                                    {successMessage}
                                </div>
                            )}

                            <div className='d-flex justify-content-center mb-4'>
                                <div className='d-flex justify-content-center mb-4'>
                                    <TipoUsuarioButton
                                        tipo='paciente'
                                        tipoActual={tipoUsuario}
                                        onSelect={setTipoUsuario}
                                    />
                                    <TipoUsuarioButton
                                        tipo='medico'
                                        tipoActual={tipoUsuario}
                                        onSelect={setTipoUsuario}
                                    />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Campos generales */}
                                <div className='mb-4'>
                                    <label
                                        htmlFor='dni_usuario'
                                        className='form-label'
                                    >
                                        DNI
                                    </label>
                                    <input
                                        type='text'
                                        id='dni_usuario'
                                        name='dni_usuario'
                                        className='form-control'
                                        required
                                        value={formData.dni_usuario}
                                        onChange={handleChange}
                                    />
                                    {errors.dni_usuario && (
                                        <small className='text-danger'>
                                            {errors.dni_usuario}
                                        </small>
                                    )}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='nombre_usuario'
                                        className='form-label'
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        type='text'
                                        id='nombre_usuario'
                                        name='nombre_usuario'
                                        className='form-control'
                                        required
                                        value={formData.nombre_usuario}
                                        onChange={handleChange}
                                    />
                                    {errors.nombre_usuario && (
                                        <small className='text-danger'>
                                            {errors.nombre_usuario}
                                        </small>
                                    )}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='apellido_usuario'
                                        className='form-label'
                                    >
                                        Apellido
                                    </label>
                                    <input
                                        type='text'
                                        id='apellido_usuario'
                                        name='apellido_usuario'
                                        className='form-control'
                                        required
                                        value={formData.apellido_usuario}
                                        onChange={handleChange}
                                    />
                                    {errors.apellido_usuario && (
                                        <small className='text-danger'>
                                            {errors.apellido_usuario}
                                        </small>
                                    )}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='fecha_nac_usuario'
                                        className='form-label'
                                    >
                                        Fecha de Nacimiento
                                    </label>
                                    <input
                                        type='date'
                                        id='fecha_nac_usuario'
                                        name='fecha_nac_usuario'
                                        className='form-control'
                                        required
                                        value={
                                            formData.fecha_nac_usuario as string
                                        }
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='celular_usuario'
                                        className='form-label'
                                    >
                                        Celular
                                    </label>
                                    <input
                                        type='text'
                                        id='celular_usuario'
                                        name='celular_usuario'
                                        className='form-control'
                                        required
                                        value={formData.celular_usuario}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='email_usuario'
                                        className='form-label'
                                    >
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        id='email_usuario'
                                        name='email_usuario'
                                        className='form-control'
                                        required
                                        value={formData.email_usuario}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor='clave_usuario'
                                        className='form-label'
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        type='password'
                                        id='clave_usuario'
                                        name='clave_usuario'
                                        className='form-control'
                                        required
                                        value={formData.clave_usuario}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label className='form-label'>
                                        Dirección
                                    </label>
                                    <div className='row g-2'>
                                        <div className='col-md-8'>
                                            <input
                                                type='text'
                                                name='calle_usuario'
                                                placeholder='Calle'
                                                className='form-control'
                                                required
                                                value={formData.calle_usuario}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='col-md-4'>
                                            <input
                                                type='text'
                                                name='num_usuario'
                                                placeholder='Número'
                                                className='form-control'
                                                required
                                                value={formData.num_usuario}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <label className='form-label'>
                                        Código Postal
                                    </label>
                                    <input
                                        type='text'
                                        name='cod_postal'
                                        className='form-control'
                                        required
                                        value={formData.cod_postal}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Ciudad (fija, deshabilitada) */}
                                <div className='mb-4'>
                                    <label className='form-label'>Ciudad</label>
                                    <select
                                        className='form-control'
                                        name='id_ciudad'
                                        required
                                        value={formData.id_ciudad}
                                        onChange={handleChange}
                                    >
                                        {ciudades.map((ciudad) => (
                                            <option key={ciudad._id} value={ciudad._id}>
                                                {ciudad.nombre_ciudad}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_ciudad && <small className='text-danger'>{errors.id_ciudad.message}</small>}
                                </div>

                                {tipoUsuario === "medico" && (
                                    <EspecialidadInput
                                        value={
                                            (formData as any).especialidades ||
                                            ""
                                        }
                                        onChange={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                especialidades: [value],
                                            }))
                                        }
                                        especialidades={especialidades}
                                        error={errors.especialidades}
                                    />
                                )}

                                {/* Campos condicionales */}
                                {tipoUsuario === "medico" && (
                                    <div className='mb-4'>
                                        <label className='form-label'>
                                            Matrícula Profesional
                                        </label>
                                        <input
                                            type='text'
                                            name='matricula_medico'
                                            className='form-control'
                                            required
                                            value={
                                                (formData as any)
                                                    .matricula_medico || ""
                                            }
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}

                                {tipoUsuario === "paciente" && (
                                    <ObraSocialInput
                                        value={
                                            (formData as any).id_obra_social ||
                                            ""
                                        }
                                        onChange={(value) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                id_obra_social: value,
                                            }))
                                        }
                                        obrasSociales={obrasSociales}
                                    />
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
