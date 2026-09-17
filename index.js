import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import pedidosRoutes from './routes/pedidosRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';
import itensPedidoRoutes from './routes/itensPedidoRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', pedidosRoutes);
app.use('/api', clientesRoutes);
app.use('/api', itensPedidoRoutes);

app.get('/', (req, res) => {
  res.send('StockAPI no ar');
});

// 404
app.use((req, res) => {
  res.status(404).json({
    erro: 'rota nao encontrada'
  });
});

// Error handler
app.use((erro, req, res, next) => {
  console.error(erro);

  res.status(500).json({
    erro: 'erro interno'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});