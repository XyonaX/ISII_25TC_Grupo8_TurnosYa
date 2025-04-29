import { Request, Response } from 'express';
import Provincia from '../models/Provincia';
import { IProvincia } from '../interfaces/IProvincia';

export const obtenerProvincias = async (req: Request, res: Response) => {
    try {
        const provincias = await Provincia.find({})
            .populate('id_pais'); // Poblamos el país relacionado
        
        console.log('Provincias encontradas:', provincias.length); // Para debug
        
        res.json({
            success: true,
            data: provincias.map(p => ({
                _id: p._id,
                nombre_provincia: p.nombre_provincia,
                pais: p.id_pais // Objeto completo del país
            }))
        });
    } catch (error: any) {
        console.error('Error al obtener provincias:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};