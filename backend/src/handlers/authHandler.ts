import { Request, Response } from "express";
import Joi from "joi";
import { loginController, registerController } from "../controllers/authController";
import { IUsuario } from "../interfaces/IUsuario";
import Paciente from "../models/Paciente";
import Medico from "../models/Medico";
import userSchema from "./validations/userSchema";

// Esquema de validación para login
const loginSchema = Joi.object({
    email_usuario: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Debe ser un correo electrónico válido',
            'string.empty': 'El email es obligatorio'
        }),
    clave_usuario: Joi.string()
        .required()
        .messages({
            'string.empty': 'La contraseña es obligatoria'
        })
});

const registerHandler = async (req: Request, res: Response) => {
    try {
        // Validar los datos de entrada (solo campos de Usuario)
        const { error, value } = userSchema.validate(req.body, {
            abortEarly: false
        });

        if (error) {
                res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: error.details.map(detail => detail.message)
            });
        }

        // Registrar el usuario básico
        const newUser = await registerController(value);

        // Crear registro específico según tipo de usuario
        if (req.body.tipo_usuario === 'paciente') {
            const newPaciente = new Paciente({
                id_usuario: newUser._id,
                id_obra_social: req.body.id_obra_social
            });
            await newPaciente.save();
        } else if (req.body.tipo_usuario === 'medico') {
            const newMedico = new Medico({
                id_usuario: newUser._id,
                matricula_medico: req.body.matricula_medico,
                especialidades: req.body.especialidades,
                obras_sociales: req.body.obras_sociales || []
            });
            await newMedico.save();
        }

        // No devolver la contraseña en la respuesta
        const { clave_usuario, ...userWithoutPassword } = newUser.toObject();

            res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: userWithoutPassword
        });

    } catch (error: any) {
        console.error("Error en registro:", error);
        
        if (error.message.includes("ya está registrado")) {
                res.status(409).json({
                success: false,
                message: error.message
            });
        }

            res.status(500).json({
            success: false,
            message: 'Error interno del servidor al registrar usuario',
            error: error.message
        });
    }
};

const loginHandler = async (req: Request, res: Response) => {
    try {
        // Validar los datos de entrada
        const { error } = loginSchema.validate(req.body);
        
        if (error) {
                res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { email_usuario, clave_usuario } = req.body;

        // Autenticar al usuario
        const { user } = await loginController(email_usuario, clave_usuario);

        // No devolver la contraseña en la respuesta
        const { clave_usuario: _, ...userWithoutPassword } = user.toObject();

            res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            data: {
                user: userWithoutPassword,
            }
        });

    } catch (error: any) {
        console.error("Error en login:", error);
        
        if (error.message === "Credenciales inválidas" || 
            error.message === "Usuario no encontrado") {
                res.status(401).json({
                success: false,
                message: error.message
            });
        }

            res.status(500).json({
            success: false,
            message: 'Error interno del servidor al iniciar sesión',
            error: error.message
        });
    }
};

export { registerHandler, loginHandler };