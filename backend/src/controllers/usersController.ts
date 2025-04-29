import bcrypt from "bcryptjs";
import { IUsuario } from "../interfaces/IUsuario";
import Usuario from "../models/Usuario";

const getAllUsersController = async () => {
    try {
        const users = await Usuario.find()
            .populate('id_ciudad')
            .populate('id_estado_usuario')
            .select('-clave_usuario'); // Excluimos la contraseña de los resultados
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
    }
};

const getUserByDniController = async (dni: string) => {
    try {
        const user = await Usuario.findOne({ dni_usuario: dni })
            .populate('id_ciudad')
            .populate('id_estado_usuario')
            .select('-clave_usuario');
        
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw new Error("Error fetching user");
    }
};

const getUserByIdController = async (id: string) => {
    try {
        const user = await Usuario.findById(id)
            .populate('id_ciudad')
            .populate('id_estado_usuario')
            .select('-clave_usuario');
        
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error("Error fetching user: ", error);
        throw new Error("Error fetching user");
    }
};

const createUserController = async (userData: IUsuario) => {
    try {
        console.log("Función createUserController ejecutándose!", userData);
        
        // Verificar si el usuario ya existe por DNI o Email
        const existingUser = await Usuario.findOne({
            $or: [
                { dni_usuario: userData.dni_usuario },
                { email_usuario: userData.email_usuario }
            ]
        });
        
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(userData.clave_usuario, 10);
        
        // Crear el nuevo usuario
        const newUser = new Usuario({
            ...userData,
            clave_usuario: hashedPassword,
            fecha_nac_usuario: new Date(userData.fecha_nac_usuario) // Asegurar que es Date
        });

        await newUser.save();
        
        // Obtener el usuario sin la contraseña para devolverlo
        const userToReturn = await Usuario.findById(newUser._id)
            .populate('id_ciudad')
            .populate('id_estado_usuario')
            .select('-clave_usuario');
        
        return userToReturn;
    } catch (error) {
        console.error("Error creating user: ", error);
        throw new Error("Error creating user");
    }
};

const updateUserController = async (id: string, userData: Partial<IUsuario>) => {
    try {
        const updateData: Partial<IUsuario> = { ...userData };
        
        // Si se está actualizando la contraseña, hashearla
        if (userData.clave_usuario) {
            updateData.clave_usuario = await bcrypt.hash(userData.clave_usuario, 10);
        }
        
        // Si se está actualizando la fecha, convertirla a Date
        if (userData.fecha_nac_usuario) {
            updateData.fecha_nac_usuario = new Date(userData.fecha_nac_usuario);
        }
        
        const updatedUser = await Usuario.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true // Para que valide los campos actualizados
        })
        .populate('id_ciudad')
        .populate('id_estado_usuario')
        .select('-clave_usuario');
        
        if (!updatedUser) {
            throw new Error("User not found");
        }
        
        return updatedUser;
    } catch (error) {
        console.error("Error updating user: ", error);
        throw new Error("Error updating user");
    }
};

const deleteUserController = async (id: string) => {
    try {
        const deletedUser = await Usuario.findByIdAndDelete(id)
            .select('-clave_usuario');
        
        if (!deletedUser) {
            throw new Error("User not found");
        }
        
        return deletedUser;
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw new Error("Error deleting user");
    }
};

export {
    getAllUsersController,
    getUserByDniController,
    getUserByIdController,
    createUserController,
    updateUserController,
    deleteUserController,
};