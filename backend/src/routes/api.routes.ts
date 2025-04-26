import { Router, Request, Response } from "express";

const router = Router();

// Ejemplo de endpoints
router.get("/users", (req: Request, res: Response) => {
    res.json({ message: "Lista de usuarios" });
});

router.get("/products", (req: Request, res: Response) => {
    res.json({ message: "Lista de productos" });
});

export default router;
