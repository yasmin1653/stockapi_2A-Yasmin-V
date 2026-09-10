export async function validarCategoria(req,res, next) {
    const {nome} = req.body;
    if(!nome || typeof nome!== 'string'|| !nome.trim()){
        return res.status(400).json({erro: 'nome é obrigatório e dev ser um texto'})
    }
    next();
}

