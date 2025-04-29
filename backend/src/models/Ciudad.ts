import { Schema, model } from "mongoose";

const CiudadSchema = new Schema({
    nombre_ciudad: {
        type: String,
        required: true,
    },
    id_provincia: {
        type: Schema.Types.ObjectId,
        ref: "Provincia",
        required: true,
    }
})

const Ciudad = model("Ciudad", CiudadSchema)

export default Ciudad;