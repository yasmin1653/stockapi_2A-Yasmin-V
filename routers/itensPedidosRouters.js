import express from 'express';
import * as controller from '../controllers/itensPedidoController.js';
import { validarItemPedido } from '../middlewares/validarItemPedido.js';

const router = express.Router();

router.post(
  '/itens_pedido',
  validarItemPedido,
  controller.criar
);

router.get(
  '/itens_pedido',
  controller.listar
);

router.get(
  '/itens_pedido/:id',
  controller.buscarPorId
);

router.put(
  '/itens_pedido/:id',
  validarItemPedido,
  controller.atualizar
);

router.delete(
  '/itens_pedido/:id',
  controller.deletar
);

export default router;