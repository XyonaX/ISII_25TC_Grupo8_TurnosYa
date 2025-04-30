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
import Usuario from "../models/Usuario";
import EspecialidadMedico from "../models/EspecialidadMedico";

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
        console.log("Datos de registro:", req.body);
        const newUser = await registerController(req.body);

        // Si el tipo de usuario es paciente, creá un documento en pacientes
        if (req.body.tipo_usuario === "paciente") {
            try {
                const nuevoPaciente = new Paciente({
                    id_usuario: newUser._id,
                    id_obra_social: req.body.id_obra_social,
                });
                await nuevoPaciente.save();
            } catch (error) {
                console.error(
                    "Error al crear paciente, se elimina el usuario:",
                    error
                );
                await Usuario.findByIdAndDelete(newUser._id);
                return res.status(500).json({
                    success: false,
                    message: "Error al crear paciente",
                });
            }
        }

        // Si el tipo de usuario es médico, creá un documento en médicos
        if (req.body.tipo_usuario === "medico") {
            try {
                const nuevoMedico = new Medico({
                    id_usuario: newUser._id,
                    matricula_medico: req.body.matricula_medico,
                });
                await nuevoMedico.save();

                const especialidades = req.body.especialidades || [];
                console.log("Especialidades recibidas:", especialidades);

                for (const id_especialidad of especialidades) {
                    try {
                        const relacion = new EspecialidadMedico({
                            id_medico: nuevoMedico._id,
                            id_especialidad,
                        });
                        await relacion.save();
                        console.log("Relacion guardada:", relacion);
                    } catch (err) {
                        console.error(
                            "Error al guardar especialidad/medico:",
                            err
                        );
                    }
                }

                return res.status(201).json({
                    success: true,
                    message:
                        "Usuario registrado correctamente con especialidades",
                });
            } catch (error) {
                console.error("Error al crear médico o especialidades:", error);
                await Usuario.findByIdAndDelete(newUser._id);
                return res.status(500).json({
                    success: false,
                    message: "Error al crear médico o asignar especialidades",
                });
            }
        }
    } catch (error: any) {
        console.error("Error en registro:", error.message);
        res.status(409).json({
            success: false,
            message: error.message,
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
