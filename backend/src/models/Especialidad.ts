import { Schema, model } from "mongoose";

const EspecialidadSchema = new Schema({
  nombre_especialidad: {
    type: String,
    required: true,
    unique: true
  }
}, { collection: 'especialidades' });

const Especialidad = model("Especialidad", EspecialidadSchema);

export default Especialidad;