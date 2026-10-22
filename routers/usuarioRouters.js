import { Router } from 'express';
import { registrar, login } from '../controllers/usuarioControllers.js'; 
import { deletar } from '../controllers/categoriaControllers.js';
import { autenticar } from '../middlewares/autenticar.js';

const router = Router();

router.post('/usuarios/registro', registrar);
router.post('/usuarios/login', login);
router.delete('/:id', autenticar, deletar);

export default router;
