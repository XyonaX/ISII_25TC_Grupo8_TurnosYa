import { Request, Response } from "express";
import {
    getAllUsersController,
    getUserByDniController,
    getUserByIdController,
    createUserController,
    deleteUserController,
    updateUserController,
} from "../controllers/usersController";
import userUpdateSchema from "./validations/userUpdateSchema";
import userSchema from "./validations/userSchema";

const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersController();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching users",
            error: error.message,
        });
    }
};

const getUserByDniHandler = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        const user = await getUserByDniController(dni);
        if (!user) {
                res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
            res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching user",
            error: error.message,
        });
    }
};

const getUserByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdController(id);
        if (!user) {
                res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching user",
            error: error.message,
        });
    }
};

const createUserHandler = async (req: Request, res: Response) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
            res.status(400).json({
            success: false,
            message: "Validation error",
            error: error.details[0].message,
        });
    }

    try {
        const newUser = await createUserController(req.body);
        res.status(201).json({
            success: true,
            data: newUser,
        });
    } catch (error: any) {
        console.error(error);
        if (error.message === "User already exists") {
                res.status(409).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error while creating user",
            error: error.message,
        });
    }
};

const updateUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error } = userUpdateSchema.validate(req.body);
    if (error) {
            res.status(400).json({
            success: false,
            message: "Validation error",
            error: error.details[0].message,
        });
    }

    try {
        const updatedUser = await updateUserController(id, req.body);
        if (!updatedUser) {
                res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            data: updatedUser,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating user",
            error: error.message,
        });
    }
};

const deleteUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserController(id);
        if (!deletedUser) {
                res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error while deleting user",
            error: error.message,
        });
    }
};

export {
    getAllUsersHandler,
    getUserByDniHandler,
    getUserByIdHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
};