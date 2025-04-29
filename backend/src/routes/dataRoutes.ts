import { Router } from 'express';
import {
    getCiudadesHandler,
    getProvinciasHandler,
    getPaisesHandler,
    getObrasSocialesHandler,
    getEspecialidadesHandler
  } from '../handlers/dataHandlers';

const router = Router();

// Obtener datos de localización
router.get('/ciudades', getCiudadesHandler);
router.get('/provincias', getProvinciasHandler);
router.get('/paises', getPaisesHandler);

// Obtener datos médicos
router.get('/obras-sociales', getObrasSocialesHandler);
router.get('/especialidades', getEspecialidadesHandler);

export default router;