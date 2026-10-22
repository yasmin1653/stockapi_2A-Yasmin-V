import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

export function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho Authorization foi enviado
  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  // O formato esperado é "Bearer <TOKEN>"
  const partes = authHeader.split(' ');
  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({ mensagem: 'Token malformatado.' });
  }

  const token = partes[1];

  try {
    // Verifica e decodifica o token
    const decodificado = jwt.verify(token, JWT_SECRET);
    
    // Salva os dados do usuário logado na requisição para uso futuro
    req.usuarioLogado = decodificado; 
    
    return next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
}
