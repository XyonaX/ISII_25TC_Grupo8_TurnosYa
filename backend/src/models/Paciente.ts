import { Schema, model } from 'mongoose';

const PacienteSchema = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true
    },
    id_obra_social: {
        type: Schema.Types.ObjectId,
        ref: 'obras_sociales',
        required: false
    }
    // No necesitas id_paciente ya que MongoDB genera _id automáticamente
}, { timestamps: true });

const Paciente = model('Paciente', PacienteSchema);

export default Paciente;