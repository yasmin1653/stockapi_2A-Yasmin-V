import express from 'express';
import * as controller from '../controllers/produtosControllers.js';

const router = express.Router();

//prefixo define só uma vez. Ex "produto"
router.post('/produtos', controller.criar);
router.get('/produtos', controller.listar)
router.get('/produtos/:id', controller.buscarPorId);
router.patch('/produtos/:id', controller.atualizar);
router.delete('/produtos/:id', controller.deletar);

export default router;