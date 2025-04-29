import Joi from "joi";

const userSchema = Joi.object({
    dni_usuario: Joi.string().required().max(8).messages({
        "string.max": "El DNI no puede tener más de 8 caracteres",
        "string.empty": "El DNI es requerido",
    }),
    nombre_usuario: Joi.string().required().min(4).max(50).messages({
        "string.max": "El nombre no puede tener más de 50 caracteres",
        "string.min": "El nombre no puede tener menos de 4 caracteres",
        "string.empty": "El nombre es requerido",
    }),
    apellido_usuario: Joi.string().required().max(50).messages({
        "string.max": "El apellido no puede tener más de 50 caracteres",
        "string.empty": "El apellido es requerido",
    }),
    fecha_nac_usuario: Joi.date().required().messages({
        "date.base": "La fecha de nacimiento no es válida",
        "date.empty": "La fecha de nacimiento es requerida",
    }),
    celular_usuario: Joi.string()
        .required()
        .pattern(/^[0-9]{10,15}$/)
        .messages({
            "string.pattern.base": "El celular no es válido",
            "string.empty": "El celular es requerido",
        }),
    email_usuario: Joi.string().email().required().messages({
        "string.email": "El email no es válido",
        "string.empty": "El email es requerido",
    }),
    clave_usuario: Joi.string()
        .required()
        .messages({
            "string.empty": "La clave es requerida",
        }),
    calle_usuario: Joi.string().required().max(50).messages({
        "string.max": "La calle no puede tener más de 50 caracteres",
        "string.empty": "La calle es requerida",
    }),
    num_usuario: Joi.string().required().max(4).messages({
        "string.max": "El número no puede tener más de 4 caracteres",
        "string.empty": "El número es requerido",
    }),
    dpto_usuario: Joi.string().optional().allow(null).max(20).messages({
        "string.max": "El departamento no puede tener más de 20 caracteres",
    }),
    cod_postal: Joi.string().required().max(10).messages({
        "string.max": "El código postal no puede tener más de 10 caracteres",
        "string.empty": "El código postal es requerido",
    }),
    id_ciudad: Joi.string().required().messages({
        "string.empty": "La ciudad es requerida",
    }),
    id_estado_usuario: Joi.string().required().messages({
        "string.empty": "El estado es requerido",
    }),
    tipo_usuario: Joi.string()
        .valid('paciente', 'medico')
        .required()
        .messages({
            'any.required': 'El tipo de usuario es obligatorio',
            'any.only': 'El tipo de usuario debe ser paciente o médico'
        }),

    // Campos condicionales
    id_obra_social: Joi.when('tipo_usuario', {
        is: 'paciente',
        then: Joi.string().required().messages({
            "string.empty": "La obra social es requerida para pacientes"
        }),
        otherwise: Joi.forbidden()
    }),
    matricula_medico: Joi.when('tipo_usuario', {
        is: 'medico',
        then: Joi.string().required().messages({
            "string.empty": "La matrícula es requerida para médicos"
        }),
        otherwise: Joi.forbidden()
    }),
    especialidades: Joi.when('tipo_usuario', {
        is: 'medico',
        then: Joi.array().items(Joi.string()).required().messages({
            "any.required": "Debe especificar al menos una especialidad"
        }),
        otherwise: Joi.forbidden()
    }),
    obras_sociales: Joi.when('tipo_usuario', {
        is: 'medico',
        then: Joi.array().items(Joi.string()).optional(),
        otherwise: Joi.forbidden()
    }),
});

export default userSchema;
