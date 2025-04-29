import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { authService } from "../services/userServices";
import { RegisterFormData, RegisterErrors } from "../types/userTypes";

const Registrarse = () => {
    const navigate = useNavigate();
    const [tipoUsuario, setTipoUsuario] = useState<"paciente" | "medico">(
        "paciente"
    );
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
        id_ciudad: "5f8d0d55b54764421b7156b6",
        id_estado_usuario: "5f8d0d55b54764421b7156b7",
    });

    const [errors, setErrors] = useState<RegisterErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const especialidades = [
        "Cardiología",
        "Dermatología",
        "Pediatría",
        "Oftalmología",
        "Neurología",
    ];
    const obrasSociales = ["OSDE", "Swiss Medical", "Galeno", "Medicus"];
    //const ciudades = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
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

        try {
            const userToSend = {
                ...formData,
                tipo_usuario: tipoUsuario,
                especialidades:
                    tipoUsuario === "medico"
                        ? [formData.especialidades]
                        : undefined,
            };

            console.log(userToSend);

            const response = await authService.register(userToSend);

            if (response) {
                setSuccessMessage(
                    "¡Registro exitoso! Serás redirigido al inicio de sesión..."
                );
                setTimeout(() => {
                    navigate("/login");
                }, 3000); // redirige luego de 3 segundos
            }
        } catch (error: any) {
            console.error("Error en registro:", error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({
                    general:
                        error.message || "Ocurrió un error durante el registro",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                <button
                                    type='button'
                                    className={`btn ${
                                        tipoUsuario === "paciente"
                                            ? "btn-success"
                                            : "btn-outline-success"
                                    } mx-2`}
                                    onClick={() => setTipoUsuario("paciente")}
                                >
                                    Paciente
                                </button>
                                <button
                                    type='button'
                                    className={`btn ${
                                        tipoUsuario === "medico"
                                            ? "btn-success"
                                            : "btn-outline-success"
                                    } mx-2`}
                                    onClick={() => setTipoUsuario("medico")}
                                >
                                    Médico
                                </button>
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
                                        disabled
                                        value={formData.id_ciudad}
                                    >
                                        <option>Buenos Aires</option>
                                    </select>
                                </div>
                                {tipoUsuario === "medico" && (
                                    <div className='mb-4'>
                                        <label className='form-label'>
                                            Especialidad
                                        </label>
                                        <select
                                            className='form-control'
                                            name='especialidades'
                                            required
                                            value={
                                                (formData as any)
                                                    .especialidades || ""
                                            }
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    especialidades:
                                                        e.target.value, // será string
                                                }));
                                            }}
                                        >
                                            <option value=''>
                                                Seleccione una especialidad
                                            </option>
                                            {especialidades.map((esp, i) => (
                                                <option key={i} value={esp}>
                                                    {esp}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.especialidades && (
                                            <small className='text-danger'>
                                                {errors.especialidades}
                                            </small>
                                        )}
                                    </div>
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
                                    <div className='mb-4'>
                                        <label className='form-label'>
                                            Obra Social
                                        </label>
                                        <select
                                            className='form-control'
                                            name='id_obra_social'
                                            required
                                            value={
                                                (formData as any)
                                                    .id_obra_social || ""
                                            }
                                            onChange={handleChange}
                                        >
                                            <option value=''>
                                                Seleccione una obra social
                                            </option>
                                            {obrasSociales.map((obra, i) => (
                                                <option key={i} value={obra}>
                                                    {obra}
                                                </option>
                                            ))}
                                        </select>
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
