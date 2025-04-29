import { Document } from "mongoose";

export interface IEstadoTurno extends Document {
    id_estado_turno: number;
    nombre_estado_turno: string;
}
