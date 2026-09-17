import * as service from '../services/clientesService.js';

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

export async function listar(req, res, next) {
  try {
    const clientes = await service.listarTodos();

    res.json(clientes);
  } catch (erro) {
    next(erro);
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params;

    const cliente = await service.buscarPorId(id);

    if (!cliente) {
      return res.status(404).json({
        erro: 'sem registro'
      });
    }

    res.json(cliente);
  } catch (erro) {
    next(erro);
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params;

    const existente = await service.buscarPorId(id);

    if (!existente) {
      return res.status(404).json({
        erro: 'sem registro'
      });
    }

    await service.atualizar(id, req.body);

    res.json({
      id,
      ...req.body
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