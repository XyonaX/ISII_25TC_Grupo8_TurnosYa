import { Document } from "mongoose";
import { IUsuario } from "./IUsuario";

// Interface base
export interface IObraSocial extends Document {
    matricula_medico: string;
    codigo?: string;
}
