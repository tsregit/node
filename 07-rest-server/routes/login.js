var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();
const Usuario = require('../models/usuario');

router.post('/', (req, res, next) => {
    const { email, password} = req.body;
    Usuario.findOne({email}, (err, usuarioDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                message: err
            });
        }

        if( !usuarioDB ) {
            return res.status(400)
            .json({
                ok: false,
                message: '(Usuario) o contraseña incorrectos'
            });
        }
        if( !bcrypt.compareSync(password, usuarioDB.password)){
            return res.status(400)
            .json({
                ok: false,
                message: 'Usuario o (contraseña) incorrectos'
            });
        }
        const token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN});
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    });
});

module.exports = router;