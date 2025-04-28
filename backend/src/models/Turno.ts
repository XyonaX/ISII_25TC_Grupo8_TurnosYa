import { Schema, model } from "mongoose";

const TurnoSchema = new Schema({
    id_turno: {
        type: String,
        required: true,
        unique: true,
    },
    motivo_turno: {
        type: String,
        required: false,
    },
    fecha_turno: {
        type: Date,
        required: true,
    },
    hora_turno: {
        type: String,
        required: true
    },
    id_estado_turno: {
        type: Schema.Types.ObjectId,
        ref: "EstadoTurno",
        required: true,
    },
    id_medico: {
        type: Schema.Types.ObjectId,
        ref: "Medico",
        required: true,
    },
    id_paciente: {
        type: Schema.Types.ObjectId,
        ref: "Paciente",
        required: true,
    }
})

const Turno = model("Turno", TurnoSchema);

export default Turno;