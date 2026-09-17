import pool from '../config/db.js';

export async function criar(item) {
  const {
    pedido_id,
    produto_id,
    quantidade,
    preco_unitario
  } = item;

  const [r] = await pool.query(
    `INSERT INTO itens_pedido
     (pedido_id, produto_id, quantidade, preco_unitario)
     VALUES (?, ?, ?, ?)`,
    [
      pedido_id,
      produto_id,
      quantidade,
      preco_unitario
    ]
  );

  return r.insertId;
}

export async function listarTodos() {
  const [rows] = await pool.query(
    'SELECT * FROM itens_pedido'
  );

  return rows;
}

export async function buscarPorId(id) {
  const [rows] = await pool.query(
    'SELECT * FROM itens_pedido WHERE id = ?',
    [id]
  );

  return rows[0];
}

export async function atualizar(id, item) {
  const existente = await buscarPorId(id);

  if (!existente) {
    return null;
  }

  const quantidade =
    item.quantidade !== undefined
      ? item.quantidade
      : existente.quantidade;

  const preco_unitario =
    item.preco_unitario !== undefined
      ? item.preco_unitario
      : existente.preco_unitario;

  const [r] = await pool.query(
    `UPDATE itens_pedido
     SET quantidade = ?, preco_unitario = ?
     WHERE id = ?`,
    [quantidade, preco_unitario, id]
  );

  return r.affectedRows;
}

export async function deletar(id) {
  const [r] = await pool.query(
    'DELETE FROM itens_pedido WHERE id = ?',
    [id]
  );

  return r.affectedRows;
}