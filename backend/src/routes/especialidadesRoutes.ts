import { Router } from 'express';
import { obtenerEspecialidades } from '../controllers/especialidadesController';

const router = Router();

router.get('/especialidades', obtenerEspecialidades);

export default router;