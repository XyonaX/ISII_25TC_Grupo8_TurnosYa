import { Router } from 'express';
import { obtenerMedicosParaListado } from '../controllers/medicoControllers';

const router = Router();

router.get('/', obtenerMedicosParaListado);

export default router;