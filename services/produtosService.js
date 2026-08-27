import pool from'../confg/db.js';

const CAMPOS_PRODUTO = ['nome','descricao','preco','quantidade_estoque','categoria_id'];

//função para criar um novo produto
export async function criar(produto) {
    const{nome, descricao, preco, quantidade_estoque, categoria_id} = produto;  //desestruturação
    const [r] = await pool.query('INSERT INTO produtos (nome, descricao, preco, quantidade_etoque, categoria_id)'+'VALUES(?,?,?)', //n expoe os dados em campo, evita ataque de sql em jek(sla)
        [nome, descricao?? null, preco,quantidade_estoque?? 0, categoria_id ?? null]);
        return r.insertId //retorna o id do produto q foi criado
}

//Função para listar todos os produtos
export async function listar() {
    const [rows] = pool.query('SELECT * FROM produtos');
    return rows;
}

//função para buscar produto pelo ID
export async function buscaPorId(id) {
    const [rows] = await pool.query('SELECT * FOM produtos WHERE id = ?', [id]);
    return rows[0]
}

//Função para atualizar od dados de um produto
export async function atualizar(id, produto) {
    // const{nome, descricao, preco, quantidade_estoque, categoria_id} = produto;
    // const[r] = await pool.query('UPDATE produto SET nome=?, descricao=?, preco=?, quantidade_estoque=?, categoria_id=? WHERE id=?', [nome, descricao, preco, quantidade_estoque, categoria_id, id]);
    // return r.affectedRows; //numero de linhas afetadas

    const camposParaAtualizar = Object.keys(camposAtualizados).filter((campo)=> CAMPOS_PRODUTO.includes(campo))

    const setClause = camposParaAtualizar.map((campo)=> `${campo} = ?`).join(', '); //set treco recebe '?'

    const valores = camposParaAtualizar.map((campo) => camposAtualizados[campo]);

    const [r] = await pool.query(
        `UPDATE produtos set ${setClause} WHERE id = ?`, 
        [...valores, id] // O ... espalha o conteúdo do array
    )

    return r.affectedRows;
}

//Função para deletar um produto
export async function deletar(id) {
    const [r] = await pool.query('DELETE FROM produtos WHERE id=?', [id]);
    return r.affectedRows;
}