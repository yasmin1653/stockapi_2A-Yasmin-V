import pool from '../confg/db.js';

export async function criar(categorias) {
    const {nome} = categorias;
    const {r} = await pool.query(
        'INSERT INTO  categorias (nome) VALUE (?)', [nome]
    );
//se tem async tem await

    return r.insertId;  //retornar o ID de uma linha que acabou de ser inserida
}

export async function listar() {
    const[rows] = await pool.query('SELECT * FROM categorias');
    return rows
} // rows pega as linhas

export async function buscarPorId(id) {
    const [rows] = await pool.query(
        'SELECT * FROM categorias WHERE id = ?', [id]
    );
    return rows[0];
}

export async function atualizar(id, categorias) {
    const{nome} = categorias;
    const [r] = await pool.query(
        'UPDATE categorias SET nome = ? WHERE id = ?', [nome, id] //nunca fazer update sem o WHERE
    );
    return r.affectedRows 
}

export async function deletar(id) {
    const [r] = await pool.query(
        'DELETE FROM categorias WHERE id = ?', [id]
    );
    return r.affectedRows;
}