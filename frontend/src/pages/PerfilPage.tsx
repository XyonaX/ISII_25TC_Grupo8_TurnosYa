import { useState } from "react";
import { userService } from "../services/userServices";
import { useUserStore } from "../store/userStore";

export const PerfilPage = () => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [formData, setFormData] = useState({
        nombre: user?.nombre_usuario || "",
        apellido: user?.apellido_usuario || "",
        email: user?.email_usuario || "",
        celular: user?.celular_usuario || "",
        dni: user?.dni_usuario || "",
        calle: user?.calle_usuario || "",
        numero: user?.num_usuario || "",
        codPostal: user?.cod_postal || "",
        fechaNacimiento: user?.fecha_nac_usuario || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        try {
            const token = localStorage.getItem("token");
            const updatedUser = await userService.updateUser(user._id, {
                nombre_usuario: formData.nombre,
                apellido_usuario: formData.apellido,
                email_usuario: formData.email,
                celular_usuario: formData.celular,
                dni_usuario: formData.dni,
                calle_usuario: formData.calle,
                num_usuario: formData.numero,
                cod_postal: formData.codPostal,
                fecha_nac_usuario: formData.fechaNacimiento,
            });

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error actualizando el perfil:", error);
            alert("Hubo un error al actualizar el perfil");
        }
    };

    return (
        <div className='container mt-5'>
            <h2 className='mb-4'>Mi perfil</h2>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            type='text'
                            className='form-control'
                            name='nombre'
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Apellido</label>
                        <input
                            type='text'
                            className='form-control'
                            name='apellido'
                            value={formData.apellido}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Correo Electrónico</label>
                        <input
                            type='email'
                            className='form-control'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Celular</label>
                        <input
                            type='text'
                            className='form-control'
                            name='celular'
                            value={formData.celular}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>DNI</label>
                        <input
                            type='text'
                            className='form-control'
                            name='dni'
                            value={formData.dni}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-md-6 mb-3'>
                        <label className='form-label'>Calle</label>
                        <input
                            type='text'
                            className='form-control'
                            name='calle'
                            value={formData.calle}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-md-4 mb-3'>
                        <label className='form-label'>Número</label>
                        <input
                            type='text'
                            className='form-control'
                            name='numero'
                            value={formData.numero}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-md-4 mb-3'>
                        <label className='form-label'>Código Postal</label>
                        <input
                            type='text'
                            className='form-control'
                            name='codPostal'
                            value={formData.codPostal}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-md-4 mb-3'>
                        <label className='form-label'>
                            Fecha de Nacimiento
                        </label>
                        <input
                            type='date'
                            className='form-control'
                            name='fechaNacimiento'
                            value={
                                formData.fechaNacimiento
                                    ? new Date(formData.fechaNacimiento)
                                          .toISOString()
                                          .slice(0, 10)
                                    : ""
                            }
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type='submit' className='btn btn-primary mb-4'>
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};
