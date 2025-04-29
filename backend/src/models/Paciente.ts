import {Schema, model} from 'mongoose';

const PacienteSchema = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true,
    },
    id_paciente: {
        type: String,
        required: true,
        unique: true,
    },
    id_obra_social: {
        type: Schema.Types.ObjectId,
        ref: 'obras_sociales',
        required: true,
    }
})

const Paciente = model('Paciente', PacienteSchema);

export default Paciente;