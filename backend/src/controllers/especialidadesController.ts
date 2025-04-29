import { Request, Response } from 'express';
import Especialidad from '../models/Especialidad';
import { IEspecialidad } from '../interfaces/IEspecialidad';

export const obtenerEspecialidades = async (req: Request, res: Response) => {
  try {
    const especialidades = await Especialidad.find({});
    res.json({
      success: true,
      data: especialidades.map(esp => ({
        _id: esp._id,
        id_especialidad: esp.id_especialidad,
        nombre_especialidad: esp.nombre_especialidad
      }))
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};