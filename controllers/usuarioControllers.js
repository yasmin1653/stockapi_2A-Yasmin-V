import * as usuariosService from '../services/usuarioService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

export async function registrar(req, res, next) {
  try {
    const { nome, email, senha } = req.body;

    // Requisito: 400 se o e-mail já estiver cadastrado
    const usuarioExiste = await usuariosService.buscarPorEmail(email);
    if (usuarioExiste) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
    }

    const id = await usuariosService.criar({ nome, email, senha });

    // Requisito: 201 se der certo (apenas id e email)
    return res.status(201).json({ id, email });
  } catch (erro) {
    next(erro); // Todo catch deve chamar next(erro)
  }
}

export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    const usuario = await usuariosService.buscarPorEmail(email);
    
    // Requisito: 401 se o e-mail não existir
    if (!usuario) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
    }

    // Requisito: 401 se a senha estiver errada
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ status: 'E-mail ou senha incorretos.' });
    }

    // Requisito: Se as credenciais estiverem certas, gerar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (erro) {
    next(erro); // Todo catch deve chamar next(erro)
  }
}
