import { Router } from "express";
import {
    createUserHandler,
    deleteUserHandler,
    getAllUsersHandler,
    getUserByDniHandler,
    getUserByIdHandler,
    updateUserHandler,
} from "../handlers/usersHandler";
import { authenticateToken } from "../middlewares/authMiddleware";

const usersRouter = Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.get("/dni/:dni", getUserByDniHandler);
usersRouter.get("/:id", getUserByIdHandler);
usersRouter.post("/create", createUserHandler);
usersRouter.put("/:id", authenticateToken,updateUserHandler)
usersRouter.delete("/:id", deleteUserHandler)

export default usersRouter;