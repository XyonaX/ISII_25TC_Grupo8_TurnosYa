import Joi from "joi";

const turnoUpdateSchema = Joi.object({
    motivo_turno: Joi.string().optional(), // paciente puede cambiar motivo
});

export default turnoUpdateSchema;