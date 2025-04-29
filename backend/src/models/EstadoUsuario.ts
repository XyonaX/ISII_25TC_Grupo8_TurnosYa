import { Schema, model } from 'mongoose';

const estadoUsuarioSchema = new Schema({
    nombre_estado_usuario: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

const EstadoUsuario = model('EstadoUsuario', estadoUsuarioSchema, 'estados_usuario');

export default EstadoUsuario;