import { Schema, model } from "mongoose";

const ObraSocialMedicoSchema = new Schema({
  id_obra_social: {
    type: Schema.Types.ObjectId,
    required: true
  },
  id_medico: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const ObraSocialMedico = model("obra_social/medico", ObraSocialMedicoSchema);

export default ObraSocialMedico;

