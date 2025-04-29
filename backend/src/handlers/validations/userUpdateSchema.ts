import Joi from "joi";

const userUpdateSchema = Joi.object({
    dni_usuario: Joi.string().max(8).optional().messages({
        "string.max": "El DNI no puede tener más de 8 caracteres",
    }),
    nombre_usuario: Joi.string().min(4).max(50).optional().messages({
        "string.max": "El nombre no puede tener más de 50 caracteres",
        "string.min": "El nombre no puede tener menos de 4 caracteres",
    }),
    apellido_usuario: Joi.string().max(50).optional().messages({
        "string.max": "El apellido no puede tener más de 50 caracteres",
    }),
    fecha_nac_usuario: Joi.date().optional().messages({
        "date.base": "La fecha de nacimiento no es válida",
    }),
    celular_usuario: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional()
        .messages({
            "string.pattern.base": "El celular no es válido",
        }),
    email_usuario: Joi.string().email().optional().messages({
        "string.email": "El email no es válido",
    }),
    clave_usuario: Joi.string().optional().messages({
        "string.empty": "La clave es requerida",
    }),
    calle_usuario: Joi.string().max(50).optional().messages({
        "string.max": "La calle no puede tener más de 50 caracteres",
    }),
    num_usuario: Joi.string().max(4).optional().messages({
        "string.max": "El número no puede tener más de 4 caracteres",
    }),
    dpto_usuario: Joi.string().max(20).optional().messages({
        "string.max": "El departamento no puede tener más de 20 caracteres",
    }),
    cod_postal: Joi.string().max(10).optional().messages({
        "string.max": "El código postal no puede tener más de 10 caracteres",
    }),
    id_ciudad: Joi.string().optional().messages({
        "string.empty": "La ciudad es requerida",
    }),
    id_estado_usuario: Joi.string().optional().messages({
        "string.empty": "El estado es requerido",
    })
});

export default userUpdateSchema;
