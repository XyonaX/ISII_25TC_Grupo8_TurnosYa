import { Document } from "mongoose";

export interface IEspecialidad extends Document {
  id_especialidad: number;
  nombre_especialidad: string;
}

