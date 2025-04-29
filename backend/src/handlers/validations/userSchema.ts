import Joi from "joi";

const userSchema = Joi.object({
    dni_usuario: Joi.string().required().max(8).messages({
        "string.max": "El DNI no puede tener mas de 8 caracteres",
        "string.empty": "El DNI es requerido",
    }),
    nombre_usuario: Joi.string().required().min(4).max(50).messages({
        "string.max": "El nombre no puede tener mas de 50 caracteres",
        "string.min": "El nombre no puede tener menos de 4 caracteres",
        "string.empty": "El nombre es requerido",
    }),
    apellido_usuario: Joi.string().required().max(50).messages({
        "string.max": "El apellido no puede tener mas de 50 caracteres",
        "string.empty": "El apellido es requerido",
    }),
    fecha_nac_usuario: Joi.date().required().messages({
        "date.base": "La fecha de nacimiento no es valida",
        "date.empty": "La fecha de nacimiento es requerida",
    }),
    celular_usuario: Joi.string()
        .required()
        .pattern(/^[0-9]{10,15}$/)
        .messages({
            "string.pattern.base": "El celular no es valido",
            "string.empty": "El celular es requerido",
        }),
    email_usuario: Joi.string().email().required().messages({
        "string.email": "El email no es valido",
        "string.empty": "El email es requerido",
    }),
    //pattern con al menos 1 letra mayuscula, al menos 1 minuscula, min 8 caracteres
    clave_usuario: Joi.string()
        .required()
        .messages({
            "string.pattern.base": "La clave no es valida",
            "string.empty": "La clave es requerida",
        }),
    calle_usuario: Joi.string().required().max(50).messages({
        "string.max": "La calle no puede tener mas de 50 caracteres",
        "string.empty": "La calle es requerida",
    }),
    num_usuario: Joi.string().required().max(4).messages({
        "string.max": "El numero no puede tener mas de 4 caracteres",
        "string.empty": "El numero es requerido",
    }),
    dpto_usuario: Joi.string().optional().allow(null).max(20).messages({
        "string.max": "El departamento no puede tener mas de 20 caracteres",
    }),
    cod_postal: Joi.string().required().max(10).messages({
        "string.max": "El codigo postal no puede tener mas de 10 caracteres",
        "string.empty": "El codigo postal es requerido",
    }),
    id_ciudad: Joi.string().required().messages({
        "string.empty": "La ciudad es requerida",
    }),
    id_estado_usuario: Joi.string().required().messages({
        "string.empty": "El estado es requerido",
    }),
});

export default userSchema;