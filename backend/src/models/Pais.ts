import { Schema, model } from "mongoose";

const PaisSchema = new Schema({
    nombre_pais: {
        type: String,
        required: true,
    }
})

const Pais = model("Pais", PaisSchema);

export default Pais;