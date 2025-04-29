import { required } from 'joi';
import {Schema, model} from 'mongoose';
import { ref } from 'process';

const MedicoSchema = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true,
    },
    matricula_medico: {
        type: String,
        required: true,
    },
});

const Medico = model('Medico', MedicoSchema, 'medicos');

export default Medico;