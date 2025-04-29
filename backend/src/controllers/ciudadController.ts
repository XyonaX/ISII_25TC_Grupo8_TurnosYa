import { Request, Response } from 'express';
import Ciudad from '../models/Ciudad';
import { CiudadPopulada  } from '../interfaces/ICiudad';

export const obtenerCiudades = async (req: Request, res: Response) => {
  try {
      const ciudades = await Ciudad.find({})
          .populate('id_provincia');
      
      console.log('Ciudades encontradas:', ciudades.length); // Para debug
      
      res.json({
          success: true,
          data: ciudades.map(c => ({
              _id: c._id,
              nombre_ciudad: c.nombre_ciudad,
              provincia: c.id_provincia
          }))
      });
  } catch (error: any) {
      console.error('Error al obtener ciudades:', error);
      res.status(500).json({
          success: false,
          error: error.message
      });
  }
};