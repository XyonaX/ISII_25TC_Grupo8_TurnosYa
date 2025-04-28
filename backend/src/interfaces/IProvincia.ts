import { Document, Types } from "mongoose";

export interface IProvincia extends Document {
    id_provincia: string;
    nombre_provincia: string;
    id_pais: Types.ObjectId;
}

export type ProvinciaPopulada = Omit<IProvincia, "id_pais"> & {
    id_pais: {
        _id: Types.ObjectId;
        nombre_pais: string;
    };
};
