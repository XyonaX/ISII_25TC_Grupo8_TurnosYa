import { Schema, model } from "mongoose";

const TurnoSchema = new Schema({
    id_turno: {
        type: Schema.Types.ObjectId,
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
        required: true,
    },
    id_estado_turno: {
        type: Schema.Types.ObjectId,
        ref: "estados_turno",
        required: true,
    },
    id_medico: {
        type: Schema.Types.ObjectId,
        ref: "Medico",
        required: true,
    },
    id_paciente: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "Paciente",
        required: false,
    },
});

const Turno = model("turnos", TurnoSchema);

export default Turno;
