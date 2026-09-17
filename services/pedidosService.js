import pool from '../config/db.js';

export async function listarTodos() {
  const [rows] = await pool.query(`
    SELECT pedidos.id,
           pedidos.data_pedido,
           pedidos.status,
           clientes.nome AS cliente
    FROM pedidos
    INNER JOIN clientes
      ON pedidos.cliente_id = clientes.id
  `);

  return rows;
}

export async function buscarPorId(id) {
  const [rows] = await pool.query(`
    SELECT pedidos.id,
           pedidos.data_pedido,
           pedidos.status,
           clientes.nome AS cliente
    FROM pedidos
    INNER JOIN clientes
      ON pedidos.cliente_id = clientes.id
    WHERE pedidos.id = ?
  `, [id]);

  return rows[0];
}

export async function criar(pedido) {
  const { cliente_id, status } = pedido;

  const [r] = await pool.query(
    'INSERT INTO pedidos (cliente_id, status) VALUES (?, ?)',
    [cliente_id, status || 'pendente']
  );

  return r.insertId;
}

export async function atualizarStatus(id, status) {
  const [r] = await pool.query(
    'UPDATE pedidos SET status = ? WHERE id = ?',
    [status, id]
  );

  return r.affectedRows;
}

export async function deletar(id) {
  const [r] = await pool.query(
    'DELETE FROM pedidos WHERE id = ?',
    [id]
  );

  return r.affectedRows;
}