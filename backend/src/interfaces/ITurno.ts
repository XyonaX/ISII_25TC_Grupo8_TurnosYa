import { Document, Types } from "mongoose";
import { IEstadoTurno } from "./IEstadoTurno";
import { IMedico } from "./IMedico";
import { UsuarioPopulado } from "./IUsuario";
import { IPaciente } from "./IPaciente";

export interface ITurno extends Document {
    id_turno: string;
    motivo_turno?: string;
    fecha_turno: Date;
    hora_turno: string;
    id_estado_turno: Types.ObjectId;
    id_medico: Types.ObjectId;
    id_paciente?: Types.ObjectId | null;
}

export type ITurnoPopulado = Omit<
    ITurno,
    "id_estado_turno" | "id_medico" | "id_paciente"
> & {
    id_estado_turno: Pick<IEstadoTurno, "_id" | "nombre_estado_turno">;
    id_medico: Omit<IMedico, "id_usuario"> & {
        id_usuario: Pick<
            UsuarioPopulado,
            "_id" | "nombre_usuario" | "apellido_usuario"
        >;
    };
    id_paciente?:
        | (Omit<IPaciente, "id_usuario" | "id_obra_social"> & {
            id_usuario: Pick<
                UsuarioPopulado,
                "_id" | "nombre_usuario" | "dni_usuario"
            >;
            id_obra_social?: {
                _id: Types.ObjectId;
                nombre: string;
            };
        })
        | null;
    disponible?: boolean;
};
