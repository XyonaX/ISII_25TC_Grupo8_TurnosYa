import { Document, Types } from "mongoose";
import { IUsuario } from "./IUsuario";

export interface IPaciente extends Document {
    id_usuario: Types.ObjectId;
    id_paciente: string;
    id_obra_social: Types.ObjectId;
}

export type PacientePopulado = Omit<
    IPaciente,
    "id_usuario" | "id_obra_social"
> & {
    id_usuario: Pick<
        IUsuario,
        "_id" | "nombre_usuario" | "dni_usuario" | "celular_usuario"
    >;
    id_obra_social?: {
        _id: Types.ObjectId;
        nombre: string;
        codigo: string;
    };
};
