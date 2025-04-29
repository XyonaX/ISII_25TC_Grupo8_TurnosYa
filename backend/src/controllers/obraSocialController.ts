import { Request, Response } from 'express';
import ObraSocial from '../models/ObraSocial';

export const obtenerObrasSociales = async (req: Request, res: Response) => {
  try {
    const obrasSociales = await ObraSocial.find({});
    
    res.json({
      success: true,
      data: obrasSociales.map(obra => ({
        _id: obra._id,
        nombre_obra_social: obra.nombre_obra_social,
        codigo: obra.codigo || null
      }))
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};