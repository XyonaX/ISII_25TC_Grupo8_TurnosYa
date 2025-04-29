import { Schema, model } from "mongoose";

const ProvinciaSchema = new Schema({
    nombre_provincia: {
        type: String,
        required: true,
    },
    id_pais: {
        type: Schema.Types.ObjectId,
        ref: "Pais",
        required: true,
    }
},{ collection: 'provincias' })

const Provincia = model("Provincia", ProvinciaSchema);

export default Provincia;