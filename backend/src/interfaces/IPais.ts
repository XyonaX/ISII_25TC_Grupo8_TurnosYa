import { Document } from "mongoose";

export interface IPais extends Document {
    nombre_pais: string;
}