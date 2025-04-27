import { Request, Response, NextFunction } from "express";
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
        const response = await getAllUsersController();
        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error fetching users",
            error: error.message,
        });
    }
};

const getUserByDniHandler = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        const response = await getUserByDniController(dni);
        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error fetching user",
            error: error.message,
        });
    }
};

const getUserByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await getUserByIdController(id);
        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error fetching user",
            error: error.message,
        });
    }
};

const createUserHandler = async (req: Request, res: Response): Promise<void> =>  {
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            message: "Error creating user",
            error: error.details[0].message,
        });
    }
    try {
        const response = await createUserController(req.body);
        res.status(201).json({
            success: true,
            data: response,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error creating user",
            error: error.message,
        });
    }
};

const updateUserHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { error } = userUpdateSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            message: "Error updating user",
            error: error.details[0].message,
        });
    }

    try {
        const response = await updateUserController(id, req.body);
        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error updating user",
            error: error.message,
        });
    }
};

const deleteUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await deleteUserController(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: response,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Error deleting user",
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
}