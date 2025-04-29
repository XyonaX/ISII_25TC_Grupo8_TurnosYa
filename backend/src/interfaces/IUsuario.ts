import { Document, Types } from "mongoose";

export interface IUsuario extends Document {
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
    id_ciudad: Types.ObjectId;
    id_estado_usuario: Types.ObjectId;
    tipo_usuario: "paciente" | "medico";
}

export type UsuarioPopulado = Omit<
    IUsuario,
    "id_ciudad" | "id_estado_usuario"
> & {
    id_ciudad: {
        _id: Types.ObjectId;
        nombre_ciudad: string;
    };
    id_estado_usuario: {
        _id: Types.ObjectId;
        nombre_estado: string;
    };
};
