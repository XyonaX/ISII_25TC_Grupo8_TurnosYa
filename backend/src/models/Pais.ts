import { Schema, model } from "mongoose";

const PaisSchema = new Schema({
    nombre_pais: {
        type: String,
        required: true,
    }
} , { collection: 'paises' });

const Pais = model("Pais", PaisSchema);

export default Pais;