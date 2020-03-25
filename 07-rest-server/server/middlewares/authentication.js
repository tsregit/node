const jwt = require('jsonwebtoken');

const verificaToken = (req, res, next) => {
    const bearer = req.get('Authorization');
    if(!bearer) {
        return res.status(401).json({
            ok: false,
            message: 'Token no valido'
        });
    }
    const token = bearer.split(' ')[1].trim();
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                message: 'Token no valido'
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}

const verifyAdminRole = (req, res, next) => {
    const usuario = req.usuario;
    if (usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            message: 'El usuario no es administrador'
        });
    }
    next();
}

const verifyTokenImagen = (req, res, next) => {
    const token  = req.query.token;
    console.log(token);
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                message: 'Token no valido'
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = {
    verificaToken,
    verifyAdminRole,
    verifyTokenImagen
};