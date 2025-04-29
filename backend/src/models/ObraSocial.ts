import { Schema, model } from "mongoose";

const ObraSocialSchema = new Schema({
    nombre_obra_social: {
        type: String,
        required: true,
    }
})

const ObraSocial = model("ObraSocial", ObraSocialSchema);

export default ObraSocial;