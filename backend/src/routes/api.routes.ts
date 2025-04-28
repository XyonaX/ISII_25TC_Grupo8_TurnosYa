import { Router, Request, Response } from "express";
import usersRouter from "./usersRoutes";

const router = Router();

// Ejemplo de endpoints
router.use("/users",usersRouter);

router.get("/products", (req: Request, res: Response) => {
    res.json({ message: "Lista de productos" });
});

export default router;
