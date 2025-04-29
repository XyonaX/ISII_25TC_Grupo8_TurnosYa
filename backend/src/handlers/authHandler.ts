import { Request, Response } from "express";
import Joi from "joi";
import {
    loginController,
    registerController,
} from "../controllers/authController";
import { IUsuario } from "../interfaces/IUsuario";
import Paciente from "../models/Paciente";
import Medico from "../models/Medico";
import userSchema from "./validations/userSchema";

// Esquema de validación para login
const loginSchema = Joi.object({
    email_usuario: Joi.string().email().required().messages({
        "string.email": "Debe ser un correo electrónico válido",
        "string.empty": "El email es obligatorio",
    }),
    clave_usuario: Joi.string().required().messages({
        "string.empty": "La contraseña es obligatoria",
    }),
});

const registerHandler = async (req: Request, res: Response) => {
    try {
        const { error, value } = userSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            console.log("Errores de validación:", error.details); // 👈
            return res.status(400).json({
                success: false,
                message: "Error de validación",
                errors: error.details.map((detail) => detail.message),
            });
        }

        console.log("Payload recibido:", value); // 👈

        const newUser = await registerController(value);

        // Crear paciente o médico según el tipo de usuario
        if (value.tipo_usuario === "paciente") {
            if (!value.id_obra_social) {
                return res.status(400).json({
                    success: false,
                    message: "La obra social es requerida para pacientes",
                });
            }

            const nuevoPaciente = new Paciente({
                id_usuario: newUser._id,
                id_obra_social: value.id_obra_social,
            });

            await nuevoPaciente.save();
        } else if (value.tipo_usuario === "medico") {
            if (!value.matricula_medico) {
                return res.status(400).json({
                    success: false,
                    message: "La matrícula es requerida para médicos",
                });
            }

            const nuevoMedico = new Medico({
                id_usuario: newUser._id,
                matricula_medico: value.matricula_medico,
            });

            await nuevoMedico.save();
        }
    } catch (error: any) {
        console.error("Error en registro:", error);

        if (error.message.includes("ya está registrado")) {
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error interno del servidor al registrar usuario",
            error: error.message,
        });
    }
};

const loginHandler = async (req: Request, res: Response) => {
    try {
        // Validar los datos de entrada
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { email_usuario, clave_usuario } = req.body;

        // Autenticar al usuario
        const { user } = await loginController(email_usuario, clave_usuario);

        // No devolver la contraseña en la respuesta
        const { clave_usuario: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            data: {
                user: userWithoutPassword,
            },
        });
    } catch (error: any) {
        console.error("Error en login:", error);

        if (
            error.message === "Credenciales inválidas" ||
            error.message === "Usuario no encontrado"
        ) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error interno del servidor al iniciar sesión",
            error: error.message,
        });
    }
};

export { registerHandler, loginHandler };
