import { Request, Response } from 'express';
import Medico from '../models/Medico';
import EspecialidadMedico from '../models/EspecialidadMedico';
import ObraSocialMedico from '../models/ObraSocialMedico';

export const obtenerMedicosParaListado = async (req: Request, res: Response) => {
  try {
      const pipeline = [
          // 1. Buscar datos del usuario (ajustado a tus campos reales)
          {
              $lookup: {
                  from: "usuarios",
                  localField: "id_usuario",
                  foreignField: "_id",
                  as: "usuario"
              }
          },
          { $unwind: { path: "$usuario", preserveNullAndEmptyArrays: true } },
          
          // 2. Buscar especialidades
          {
              $lookup: {
                  from: "especialidad/medico",
                  localField: "_id",
                  foreignField: "id_medico",
                  as: "rel_especialidades"
              }
          },
          {
              $lookup: {
                  from: "especialidades",
                  localField: "rel_especialidades.id_especialidad",
                  foreignField: "_id",
                  as: "especialidades"
              }
          },
          
          // 3. Buscar obras sociales
          {
              $lookup: {
                  from: "obra_social/medico",
                  localField: "_id",
                  foreignField: "id_medico",
                  as: "rel_obras_sociales"
              }
          },
          {
              $lookup: {
                  from: "obras_sociales",
                  localField: "rel_obras_sociales.id_obra_social",
                  foreignField: "_id",
                  as: "obras_sociales"
              }
          },
          
          // 4. Formatear respuesta con los nombres de campo correctos
          {
              $project: {
                  _id: 1,
                  matricula: "$matricula_medico",
                  nombreCompleto: {
                      $cond: {
                          if: { $ifNull: ["$usuario", false] },
                          then: { 
                              $concat: [
                                  "$usuario.nombre_usuario", 
                                  " ", 
                                  "$usuario.apellido_usuario"
                              ] 
                          },
                          else: "Médico sin usuario"
                      }
                  },
                  especialidad: {
                      $ifNull: [
                          { $arrayElemAt: ["$especialidades.nombre_especialidad", 0] },
                          "Sin especialidad"
                      ]
                  },
                  obraSocial: {
                      $ifNull: [
                          { $arrayElemAt: ["$obras_sociales.nombre_obra_social", 0] },
                          "Sin obra social"
                      ]
                  },
                  estado: { $literal: "disponible" }
              }
          },
          {
              $project: {
                  id: "$_id",
                  medico: "$nombreCompleto",
                  especialidad: 1,
                  obraSocial: 1,
                  estado: 1,
                  matricula: 1,
                  _id: 0
              }
          }
      ];

      const medicos = await Medico.aggregate(pipeline);
      res.json(medicos);
  } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({ 
          mensaje: 'Error al obtener médicos',
          ...(process.env.NODE_ENV === 'development' && { detalle: errorMessage })
      });
  }
};