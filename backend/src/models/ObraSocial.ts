import { Schema, model } from "mongoose";

const ObraSocialSchema = new Schema({
  nombre_obra_social: {
    type: String,
    required: true,
    unique: true
  }
});

const ObraSocial = model("obras_sociales", ObraSocialSchema);

export default ObraSocial;
