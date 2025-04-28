import { Router } from "express";
import {
    createUserHandler,
    deleteUserHandler,
    getAllUsersHandler,
    getUserByDniHandler,
    getUserByIdHandler,
    updateUserHandler,
} from "../handlers/usersHandler";

const usersRouter = Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.get("/dni/:dni", getUserByDniHandler);
usersRouter.get("/:id", getUserByIdHandler);
usersRouter.post("/create", createUserHandler);
usersRouter.put("/:id", updateUserHandler)
usersRouter.delete("/:id", deleteUserHandler)

export default usersRouter;