import { Router } from 'express';
import { obtenerMedicosParaListado } from '../controllers/medicoControllers';
const router = Router();

// Ruta para el listado de médicos
router.get('/medicos', obtenerMedicosParaListado);

export default router;