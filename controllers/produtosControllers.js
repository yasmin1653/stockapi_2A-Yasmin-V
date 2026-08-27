//Camada controler
import * as services from '../services/produtosService.js';
// o * inporta todas as funções da pasta/arquivo service

//Função para criar um novo produto - chama a função criar do service
export async function criar(req,res,next) {
    try {
        // const {nome, preco} = req.body;
        // if (!nome || !preco) {
        //     return res.status(400).json({erro: 'campos nome e preco são brigatorios'});
        // }
        const id = await services.criar(req.body)
        res.status(201).json({id, ...req.body})
    } catch (err) { 
        next(err); 
        // res.status(500).json({erro: err.message }); //mensagem de erro
    }
}

//Função para listar todos os produtos
export async function listar(req,res, next) {
    try {
        const produtos = await services.listar();
        res.json(produtos);
    } catch (err) {
        next(err)
        // res.status(500).json({erro: err.message});
    }
}

//Função para buscar produto pelo ID
export async function buscarPorId(req, res, next) {
    try{
        const {id} = req.params;
        const produto = await services.buscaPorId(id);
        if (!produto) {
            return res.status(404).json({erro: 'Produto não encontrado'});
        }
        res.json(produto)
    } catch (err) {
        next(err)
        // res.status(500).json({erro: err.message});
    }
}

//Função par atualizar od dados de um produto
export async function atualizar(req, res, next) {
    try {
        const {id} = req.params;
        const produtoExistente = await services.buscaPorId(id);
        if (produtoExistente) {
            return res.status(404).json({err: 'Produto não encontrado'})
        }
        await services.atualizar(id, req.body);
       const produtoAtualizado = await services.buscaPorId(id);
       res.json({ produtoAtualizado});
       res.json({id, ...req.body})
    } catch (err) {
        next(err);
        // res.status(500).json({erro: err.message})
    }
}

//Função para deletar um produto
export async function deletar(req, res) {
    try {
        const [id] = req.params;
        const n =  await services.deletar(id);
        if (n === 0) {
            returnres.status(404).json({erro: 'Produto não existe'})
        } return res.status(204).send() //delete bem sucedido
    } catch(err) {
        next(err);
        // res.status(500).json({erro: err.message})
    }
}