import { Schema, model } from "mongoose";

const PaisSchema = new Schema({
    id_pais: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    nombre_pais: {
    type: String,
    required: true,
    unique: true
  }
});

const Pais = model("paises", PaisSchema);

export default Pais;
