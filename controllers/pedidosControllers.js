import * as service from '../services/pedidosService.js';

export async function listar(req, res, next) {
  try {
    const pedidos = await service.listarTodos();

    res.json(pedidos);
  } catch (erro) {
    next(erro);
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params;

    const pedido = await service.buscarPorId(id);

    if (!pedido) {
      return res.status(404).json({
        erro: 'sem registro'
      });
    }

    res.json(pedido);
  } catch (erro) {
    next(erro);
  }
}

export async function criar(req, res, next) {
  try {
    const id = await service.criar(req.body);

    res.status(201).json({
      id,
      ...req.body
    });
  } catch (erro) {
    next(erro);
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existente = await service.buscarPorId(id);

    if (!existente) {
      return res.status(404).json({
        erro: 'sem registro'
      });
    }

    await service.atualizarStatus(id, status);

    res.json({
      id,
      status
    });
  } catch (erro) {
    next(erro);
  }
}

export async function deletar(req, res, next) {
  try {
    const { id } = req.params;

    const n = await service.deletar(id);

    if (n === 0) {
      return res.status(404).json({
        erro: 'sem registro'
      });
    }

    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}