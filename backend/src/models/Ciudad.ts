import { Schema, model } from "mongoose";
import { ICiudad } from "../interfaces/ICiudad";

const CiudadSchema = new Schema<ICiudad>({
    nombre_ciudad: {
    type: String,
    required: true,
  },
  id_provincia: {
    type: Schema.Types.ObjectId,
    ref: "Provincia",
    required: true,
  }
}, { collection: 'ciudades' });

const Ciudad = model<ICiudad>("Ciudad", CiudadSchema);

export default Ciudad;