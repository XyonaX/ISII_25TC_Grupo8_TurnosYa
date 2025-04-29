import { Document, Types } from "mongoose";
import { IProvincia } from "./IProvincia";

export interface ICiudad extends Document {
  nombre_ciudad: string;
  id_provincia: Types.ObjectId;
}

export type CiudadPopulada = Omit<ICiudad, "id_provincia"> & {
  id_provincia: {
    _id: Types.ObjectId;
    nombre_provincia: string;
    id_pais: {
      _id: Types.ObjectId;
      nombre_pais: string;
    };
  };
};
