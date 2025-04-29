import { Schema, model } from "mongoose";
import { IEspecialidad } from "../interfaces/IEspecialidad";

const EspecialidadSchema = new Schema<IEspecialidad>({
  id_especialidad: {
    type: Number,
    required: true,
    unique: true
  },
  nombre_especialidad: {
    type: String,
    required: true
  }
});

const Especialidad = model<IEspecialidad>("Especialidad", EspecialidadSchema);

export default Especialidad;