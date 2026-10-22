import pool from '../confg/db.js';

const CAMPOS_PRODUTO = ['nome', 'descricao', 'preco', 'quantidade_estoque', 'categorias_id']; // Ajustado para categorias_id conforme seu Workbench

// Função para criar um novo produto
export async function criar(produto) {
    const { nome, descricao, preco, quantidade_estoque, categorias_id } = produto;  
    
    // Corrigido: adicionado 's' em quantidade_estoque e ajustado para 5 interrogações (?,?,?,?,?)
    const [r] = await pool.query(
        'INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, categorias_id) VALUES (?, ?, ?, ?, ?)', 
        [nome, descricao ?? null, preco, quantidade_estoque ?? 0, categorias_id ?? null]
    );
    return r.insertId; // Retorna o id do produto que foi criado
}

// Função para listar todos os produtos
export async function listar() {
    // Corrigido: Adicionado o `await` e ajustado de `produto.` para `produtos.`
    const [rows] = await pool.query( 
        `SELECT produtos.id, produtos.nome, produtos.descricao, produtos.preco, produtos.quantidade_estoque, categorias.nome AS categoria
        FROM produtos
        INNER JOIN categorias ON produtos.categorias_id = categorias.id`
    );
    return rows;
}

// Função para buscar produto pelo ID
export async function buscaPorId(id) {
    // Corrigido: Adicionada a vírgula após produtos.descricao, ajustado produtos.quantidade_estoque e produtos.categorias_id
    const [rows] = await pool.query(
        `SELECT produtos.id, produtos.nome, produtos.descricao, produtos.preco, produtos.quantidade_estoque, categorias.nome AS categoria
        FROM produtos
        INNER JOIN categorias ON produtos.categorias_id = categorias.id
        WHERE produtos.id = ?`, [id]
    );
    return rows[0];
}

// Função para atualizar os dados de um produto
export async function atualizar(id, produto) {
    // Corrigido: Alterado 'camposAtualizados' para 'produto' (que é o parâmetro da função)
    const camposParaAtualizar = Object.keys(produto).filter((campo) => CAMPOS_PRODUTO.includes(campo));

    if (camposParaAtualizar.length === 0) return 0; // Evita erro se nenhum campo válido for enviado

    const setClause = camposParaAtualizar.map((campo) => `${campo} = ?`).join(', '); 
    const valores = camposParaAtualizar.map((campo) => produto[campo]);

    const [r] = await pool.query(
        `UPDATE produtos SET ${setClause} WHERE id = ?`, 
        [...valores, id] 
    );

    return r.affectedRows;
}

// Função para deletar um produto
export async function deletar(id) {
    const [r] = await pool.query('DELETE FROM produtos WHERE id=?', [id]);
    return r.affectedRows;
}
