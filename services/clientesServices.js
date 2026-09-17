import pool from '../config/db.js';

export async function criar(cliente) {
  const { nome, email, telefone } = cliente;

  const [r] = await pool.query(
    `INSERT INTO clientes (nome, email, telefone)
     VALUES (?, ?, ?)`,
    [nome, email, telefone]
  );

  return r.insertId;
}

export async function listarTodos() {
  const [rows] = await pool.query(
    'SELECT * FROM clientes'
  );

  return rows;
}

export async function buscarPorId(id) {
  const [rows] = await pool.query(
    'SELECT * FROM clientes WHERE id = ?',
    [id]
  );

  return rows[0];
}

export async function atualizar(id, cliente) {
  const { nome, email, telefone } = cliente;

  const [r] = await pool.query(
    `UPDATE clientes
     SET nome = ?, email = ?, telefone = ?
     WHERE id = ?`,
    [nome, email, telefone, id]
  );

  return r.affectedRows;
}

export async function deletar(id) {
  const [r] = await pool.query(
    'DELETE FROM clientes WHERE id = ?',
    [id]
  );

  return r.affectedRows;
}