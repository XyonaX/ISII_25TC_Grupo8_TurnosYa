import { Request, Response } from 'express';
import Pais from '../models/Pais';
import { IPais } from '../interfaces/IPais';

export const obtenerPaises = async (req: Request, res: Response) => {
  try {
    const paises = await Pais.find({});
    
    console.log('Paises encontradas:', paises.length);

    res.json({
      success: true,
      data: paises.map(pais => ({
        _id: pais._id,
        nombre_pais: pais.nombre_pais
      }))
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};