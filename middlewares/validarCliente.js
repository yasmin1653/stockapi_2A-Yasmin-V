export function validarCliente(req, res, next) {
  const { nome, email } = req.body;

  const erros = [];

  if (!nome) {
    erros.push('nome e obrigatorio');
  }

  if (email !== undefined) {
    if (typeof email !== 'string' || email.trim() === '') {
      erros.push('email invalido');
    }
  }

  if (erros.length > 0) {
    return res.status(400).json({
      erros
    });
  }

  next();
}