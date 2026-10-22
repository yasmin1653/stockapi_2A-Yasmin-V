import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import produtosRouters from './routers/produtoRouters.js';
import categoriasRouters from './routers/categoriaRouters.js';
import usuarioRouters from './routers/usuarioRouters.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({status: 'OK'}));

app.use('/api/v1/stockapi', produtosRouters);
app.use('/api/v1/stockapi', categoriasRouters);
app.use('/api/v1/stockapi', usuarioRouters);


app.use((req, res) => {
    res.status(404).json({erro: `Rota ${req.method} ${req.originalUrl} não encontrada`});
});

app.use((erro, req, res, next)=>{
    console.error(erro);

    if (erro.code =='ER_NO_REFERENCE_ROW_2') {
        return res.status(400).json({erro: 'categoria_id informada não existe'});
    }

    res.status(500).json({erro: 'Erro interno do servidor'})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));


// ===== ARQUIVO: services/itensPedidoService.js ===== 

// ===== ARQUIVO: middlewares/validarItemPedido.js ===== 

// ===== ARQUIVO: controllers/itensPedidoController.js ===== 

// ===== ARQUIVO: routes/itensPedidoRoutes.js ===== 

// ===== RESPOSTAS DISSERTATIVAS ===== 

// Q1: <em service conversa diretamente com o banco,
//  em middleware n´s validades,
//  controllers nós fazemos um tratamento de erro,
//  em routers nós fazemos um prefixo que define as rotas> 

// Q2: <eles não podem mostrar status 500 diretamente. É mais facil mostrar o erro ao usuario> 

// Q3: <porque para se atualizar algo ele precisa saber exatamente oque esta atualizando antes de atualizar, e ver se o "produto" existe.
// affectedRows numera linhas afetadas> 

// Q4: <item_pedido: a api deve responder com um status 400 porque o pedido não existe. 
// Em caso ao contrario ele daria um status 500, como se o pedido tivesse sido cancelado>