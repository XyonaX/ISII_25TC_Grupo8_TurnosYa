import { Schema, model } from "mongoose";

const ProvinciaSchema = new Schema({
    id_provincia: {
        type: String,
        required: true,
        unique: true,
    },
    nombre_provincia: {
        type: String,
        required: true,
    },
    id_pais: {
        type: Schema.Types.ObjectId,
        ref: "Pais",
        required: true,
    }
})

const Provincia = model("Provincia", ProvinciaSchema);

export default Provincia;