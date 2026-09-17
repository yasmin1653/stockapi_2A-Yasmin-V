export function validarItemPedido(req, res, next) {
  const {
    pedido_id,
    produto_id,
    quantidade,
    preco_unitario
  } = req.body;

  const erros = [];

  if (!pedido_id) {
    erros.push('pedido_id e obrigatorio');
  }

  if (!produto_id) {
    erros.push('produto_id e obrigatorio');
  }

  if (!quantidade || quantidade <= 0) {
    erros.push('quantidade invalida');
  }

  if (!preco_unitario || preco_unitario <= 0) {
    erros.push('preco_unitario invalido');
  }

  if (erros.length > 0) {
    return res.status(400).json({
      erros
    });
  }

  next();
}