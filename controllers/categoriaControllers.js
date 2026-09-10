import * as service from '../services/categoriasService.js';

//try captura erros
export async function criar(req, res, next) {
    try{
        const id = await service.criar(res.body)
        res.status(201).json ({id, ...req.body}) // os ... espalha oq tem dentro do array ou trasforma
    }catch (err) {
        next(err);
    }
}

export async function listar(req, res, next) {
    try {
        const categorias = await service.listar();
        res.json(categorias);
    } catch (err) {
        next(err);
    }
}

export async function buscarPorId(req, res, next) {
    try{
        const {id} = req.params;
        const categorias = await service.buscarPorId(id);
        if (!categorias) {
            return res.status(404).json({erro: 'Categoria ñ encontrada'});
        }
        res.json(categorias);
    } catch (err) {
        next(err);
    }
}

export async function atualizar(req, res, next) {
    try{
        const {id} = req.params;
        const categoriaExistente = await service.buscarPorId(id);
        if (!categoriaExistente) {
            return res.status(404).json({erro: 'Categoria ñ encontrada'});
        } await service.atualizar(id, req.body)
        res.json({id, ...req.body})
    }catch (err) {
        next(err);
    }
}

export async function deletar(req, res, next) {
    try{
        const {id} = req.params;
        const linhasRemovidas = await service.deletar(id);
        if (!linhasRemovidas === 0) {
            return res.status(404).json({erro: 'Categoria ñ encontrada'});
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}