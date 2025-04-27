const bcrypt = require("bcryptjs");
import { IUsuario } from "../interfaces/IUsuario";
import Usuario from "../models/Usuario";
import { format } from "date-fns";

const getAllUsersController = async () => {
    try {
        const users = await Usuario.find();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
    }
};

const getUserByDniController = async (dni: String) => {
    try {
        const user = await Usuario.findOne({ dni_usuario: dni });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error("Error fetchingn user: ", error);
        throw new Error("Error fetchign user");
    }
};

const getUserByIdController = async (id: String) => {
    try {
        const user = await Usuario.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error("Error fetchingn user: ", error);
    }
};

const createUserController = async (user: IUsuario) => {

    console.log("¡Función createUserController ejecutándose!", user);
    try {
        const existingUser = await Usuario.findOne({
            dni_usuario: user.dni_usuario,
        });
        if (existingUser) throw new Error("User already exists");

        const hashedPassword = await bcrypt.hash(user.clave_usuario, 10);
        
        const formatedDate = format(new Date(user.fecha_nac_usuario), "yyyy-MM-dd");
        const newUser = new Usuario({
            ...user,
            clave_usuario: hashedPassword,
            fecha_nac_usuario: formatedDate,
        });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error("Error creating user: ", error);
        throw new Error("Error creating user");
    }
};

const updateUserController = async (id: String, user: IUsuario) => {
    try {
        const updatedUser = await Usuario.findByIdAndUpdate(id, user, {
            new: true,
        });
        if (!updatedUser) throw new Error("User not found");
        return updatedUser;
    } catch (error) {
        console.error("Error updating user: ", error);
        throw new Error("Error updating user");
    }
};

const deleteUserController = async (id: String) => {
    try {
        const deleteUser = await Usuario.findByIdAndDelete(id);
        if (!deleteUser) throw new Error("User not found");
        return deleteUser;
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
