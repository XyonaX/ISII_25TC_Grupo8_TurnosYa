import { Request, Response } from "express";
import { obtenerCiudades as obtenerCiudadesController } from "../controllers/ciudadController";
import { obtenerProvincias as obtenerProvinciasController } from "../controllers/provinciaController";
import { obtenerPaises as obtenerPaisesController } from "../controllers/paisController";
import { obtenerObrasSociales as obtenerObrasSocialesController } from "../controllers/obraSocialController";
import { obtenerEspecialidades as obtenerEspecialidadesController } from "../controllers/especialidadesController";

export const getCiudadesHandler = async (req: Request, res: Response) => {
  try {
    const result = await obtenerCiudadesController(req, res);
    return result;
  } catch (error: any) {
      res.status(500).json({
      success: false,
      message: "Error al obtener ciudades",
      error: error.message,
    });
  }
};

export const getProvinciasHandler = async (req: Request, res: Response) => {
  try {
    const result = await obtenerProvinciasController(req, res);
    return result;
  } catch (error: any) {
      res.status(500).json({
      success: false,
      message: "Error al obtener provincias",
      error: error.message,
    });
  }
};

export const getPaisesHandler = async (req: Request, res: Response) => {
  try {
    const result = await obtenerPaisesController(req, res);
    return result;
  } catch (error: any) {
      res.status(500).json({
      success: false,
      message: "Error al obtener pais",
      error: error.message,
    });
  }
};

export const getObrasSocialesHandler = async (req: Request, res: Response) => {
  try {
    const result = await obtenerObrasSocialesController(req, res);
    return result;
  } catch (error: any) {
      res.status(500).json({
      success: false,
      message: "Error al obtener obra social",
      error: error.message,
    });
  }
};

export const getEspecialidadesHandler = async (req: Request, res: Response) => {
    try {
      const result = await obtenerEspecialidadesController(req, res);
      return result;
    } catch (error: any) {
        res.status(500).json({
        success: false,
        message: "Error al obtener especialidades",
        error: error.message,
      });
    }
  };
  