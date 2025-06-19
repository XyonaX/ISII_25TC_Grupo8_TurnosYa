import { Router } from 'express';
import { obtenerMedicosParaListado } from '../controllers/medicoControllers';
import { getMedicoByIdHandler } from '../handlers/medicoHandler';
const medicoRouter = Router();

// Ruta para el listado de médicos
medicoRouter.get('/', obtenerMedicosParaListado);
medicoRouter.get('/:id', getMedicoByIdHandler);

export default medicoRouter;