import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: { role: string; id: string };
        }
    }
}

export const fakeAuth = (req: Request, res: Response, next: NextFunction) => {
    req.user = { role: "paciente", id: "6810385cb081855823d330b6" }; // o role: "paciente"
    next();
};
