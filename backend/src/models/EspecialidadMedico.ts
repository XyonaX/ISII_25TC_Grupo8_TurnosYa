import { Schema, model } from "mongoose";

const EspecialidadMedicoSchema = new Schema({
  id_especialidad: {
    type: Schema.Types.ObjectId,
    required: true
  },
  id_medico: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

const EspecialidadMedico = model("especialidad/medico", EspecialidadMedicoSchema);

export default EspecialidadMedico;

