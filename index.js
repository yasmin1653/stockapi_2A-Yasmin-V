import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import produtosRouters from './routers/produtoRouters.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({status: 'OK'})); 

// prefixo de toda rota ('/api/v1/stoskapi')
app.use('/api/v1/stoskapi', produtosRouters);

// trata requisições de rotas q n existem
app.use((req, res) => {
    res.status(404).json({erro:`Rota &{req.method} &{req.originalUrl} não encontrada`})
});

//mensagem generica || Trata erros
app.use((erro, req,res, next) => {
    console.error(erro);

    if (erro.code =='ER_NO_REFERENCE_ROW_2') {
        return res.status(400).json({erro: 'categoria_id informada não existe'})
    }

    res.status(500).json({erro: 'Erro interno do servidor'})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));