import { Schema, model } from "mongoose";

const ObraSocialSchema = new Schema({
    nombre_obra_social: {
        type: String,
        required: false,
    },
    codigo: {
        type: String,
        required: false,
    }
}, { collection: 'obras_sociales' });

const ObraSocial = model("ObraSocial", ObraSocialSchema);

export default ObraSocial;
