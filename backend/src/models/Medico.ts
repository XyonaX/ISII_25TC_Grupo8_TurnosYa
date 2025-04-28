import {Schema, model} from 'mongoose';

const MedicoSchema = new Schema({
    id_usuaro: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true,
    },
    id_medico: {
        type: String,
        required: true,
        unique: true,
    },
    matricula_medico: {
        type: String,
        required: true,
    },
})

const Medico = model('Medico', MedicoSchema);

export default Medico;