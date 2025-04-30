import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Modelo ligero sin restricciones de schema
const VistaMedico = mongoose.model('VistaMedico', new mongoose.Schema({}, {
  collection: 'vista_medicos_completa',
  strict: false
}));

export const obtenerMedicosParaListado = async (req: Request, res: Response) => {
  try {
    const medicos = await VistaMedico
      .find({})
      .select('nombreCompleto especialidad obraSocial estado matricula')
      .lean();

    res.json({
      success: true,
      count: medicos.length,
      data: medicos
    });

  } catch (error) {
    console.error('❌ Error al consultar médicos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al consultar médicos'
    });
  }
};
