import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario";
import { IUsuario } from "../interfaces/IUsuario";

const registerController = async (userData: IUsuario) => {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({
            $or: [
                { dni_usuario: userData.dni_usuario },
                { email_usuario: userData.email_usuario }
            ]
        });

        if (existingUser) {
            if (existingUser.dni_usuario === userData.dni_usuario) {
                throw new Error("El DNI ya está registrado");
            }
            if (existingUser.email_usuario === userData.email_usuario) {
                throw new Error("El email ya está registrado");
            }
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(userData.clave_usuario, 10);
        
        // Crear el nuevo usuario
        const newUser = new Usuario({
            ...userData,
            clave_usuario: hashedPassword,
            id_estado_usuario: userData.id_estado_usuario || 'activo' // Valor por defecto
        });

        await newUser.save();
        
        return newUser;
    } catch (error: any) {
        console.error("Error en registro:", error);
        throw error;
    }
};

const loginController = async (email: string, password: string) => {
    try {
        // Buscar al usuario por email
        const user = await Usuario.findOne({ email_usuario: email })
            .populate('id_ciudad')
            .populate('id_estado_usuario');

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.clave_usuario);
        if (!isMatch) {
            throw new Error("Credenciales inválidas");
        }

        return { user};
    } catch (error: any) {
        console.error("Error en login:", error);
        throw error;
    }
};

export { registerController, loginController };