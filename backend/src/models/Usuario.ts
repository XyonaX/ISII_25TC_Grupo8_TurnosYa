import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
    dni_usuario: {
        type: String,
        required: true,
        unique: true,
    },
    nombre_usuario: {
        type: String,
        required: true,
    },
    apellido_usuario: {
        type: String,
        required: true,
    },
    fecha_nac_usuario: {
        type: Date,
        required: true,
    },
    celular_usuario: {
        type: String,
        required: true,
    },
    email_usuario: {
        type: String,
        required: true,
        unique: true,
    },
    clave_usuario: {
        type: String,
        required: true,
    },
    calle_usuario: {
        type: String,
        required: true,
    },
    num_usuario: {
        type: String,
        required: true,
    },
    dpto_usuario: {
        type: String,
        required: false,
    },
    cod_postal: {
        type: String,
        required: true,
    },
    id_ciudad: {
        type: Schema.Types.ObjectId,
        ref: "Ciudad",
        required: true,
    },
    id_estado_usuario: {
        type: Schema.Types.ObjectId,
        ref: "EstadoUsuario",
        required: true,
    },
    tipo_usuario: {
        type: String,
        enum: ["paciente", "medico"],
        required: true,
    },
});

const Usuario = model("Usuario", UsuarioSchema);

export default Usuario;
