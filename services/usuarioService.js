import pool from '../confg/db.js';
import bcrypt from 'bcrypt';

// registro
export async function criar(usuario) {
const { nome, email, senha } = usuario;
const senha_hash = await bcrypt.hash(senha, 10);
// Bcrypt.hash(senha, 10) — o 10 é o "custo" do hash: quanto maior, mais lento e mais seguro.

const [r] = await pool.query(
'INSERT INTO usuarios (nome, email, senha_hash)' +
' VALUES (?, ?, ?)',
[nome, email, senha_hash]
);
return r.insertId;
}

// login
export async function buscarPorEmail(email) {
const [rows] = await pool.query(
'SELECT * FROM usuarios WHERE email = ?', [email]
);
return rows[0];
}
// O login sempre começa buscando o usuário pelo e-mail — é a partir dele que conferimos a senha.
