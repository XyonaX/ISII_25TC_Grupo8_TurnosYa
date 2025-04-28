export interface IUsuario {
    dni_usuario: string;
    nombre_usuario: string;
    apellido_usuario: string;
    fecha_nac_usuario: Date;
    celular_usuario: string;
    email_usuario: string;
    clave_usuario: string;
    calle_usuario: string;
    num_usuario: string;
    dpto_usuario?: string;
    cod_postal: string;
    id_ciudad: string;
    id_estado_usuario: string;
    tipo_usuario: 'paciente' | 'profesional';
}