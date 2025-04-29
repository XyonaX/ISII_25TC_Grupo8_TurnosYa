import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
    dni_usuario: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre_usuario: {
        type: String,
        required: true,
        trim: true
    },
    apellido_usuario: {
        type: String,
        required: true,
        trim: true
    },
    fecha_nac_usuario: {
        type: Date,
        required: true
    },
    celular_usuario: {
        type: String,
        required: true,
        trim: true
    },
    email_usuario: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    clave_usuario: {
        type: String,
        required: true
    },
    calle_usuario: {
        type: String,
        required: true,
        trim: true
    },
    num_usuario: {
        type: String,
        required: true,
        trim: true
    },
    dpto_usuario: {
        type: String,
        trim: true
    },
    cod_postal: {
        type: String,
        required: true,
        trim: true
    },
    tipo_usuario: {
        type: String,
        required: true,
        enum: ["paciente", "medico"]
    },
    id_ciudad: {
        type: Schema.Types.ObjectId,
        ref: "Ciudad",
        required: true
    },
    id_estado_usuario: {
        type: Schema.Types.ObjectId,
        ref: "EstadoUsuario",
        required: true
    }
}, { timestamps: true });


const Usuario = model("Usuario", UsuarioSchema);

export default Usuario;