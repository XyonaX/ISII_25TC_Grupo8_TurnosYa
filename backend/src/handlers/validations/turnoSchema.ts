import Joi from "joi";

const turnoSchema = Joi.object({
    id_turno: Joi.string().required(),
    motivo_turno: Joi.string().allow('', null), // puede ser opcional para médicos
    fecha_turno: Joi.date().required(),
    hora_turno: Joi.string().required(),
    id_medico: Joi.string().required(),
    id_paciente: Joi.string().allow('', null), // null para médicos que crean turnos disponibles
    id_estado_turno: Joi.string().allow('', null), // lo setea el sistema, pero lo dejamos opcional
    role: Joi.string().valid('paciente', 'medico').required(), // rol del usuario que crea el turno
});

export default turnoSchema;
