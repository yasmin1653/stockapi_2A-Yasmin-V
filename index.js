import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import produtosRouters from './routers/produtoRouters.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({status: 'OK'})); 

// prefixo de toda rota ('/api/v1/stoskapi')
app.use('/api/v1/stoskapi', produtosRouters) 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));