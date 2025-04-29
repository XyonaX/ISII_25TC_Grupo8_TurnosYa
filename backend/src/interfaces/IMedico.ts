import { Document, Types } from "mongoose";
import { IUsuario } from "./IUsuario";

// Interface base
export interface IMedico extends Document {
    id_usuario: Types.ObjectId;
    id_medico: string;
    matricula_medico: string;
}

export type MedicoPopulado = Omit<IMedico, "id_usuario"> & {
    id_usuario: Pick<
        IUsuario,
        "_id" | "nombre_usuario" | "apellido_usuario" | "email_usuario"
    >;
};
