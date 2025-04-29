import { Schema, model } from 'mongoose';

const estadoUsuarioSchema = new Schema({
    nombre_estado_usuario: {  // Nota: Corregí a "estado" (singular) para coincidir con tu ejemplo
        type: String,
        required: true,
        unique: true
    }
});

const EstadoUsuario = model('estados_usuario', estadoUsuarioSchema, 'estados_usuario');

export default EstadoUsuario;