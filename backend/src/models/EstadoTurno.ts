import {Schema, model} from 'mongoose';

const estadoTurnoSchema = new Schema({
    id_estado_turno: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    nombre_estado_turno: {
        type: String,
        required: true,
    },
})


const EstadoTurno = model('estados_turno', estadoTurnoSchema, 'estados_turno');

export default EstadoTurno;