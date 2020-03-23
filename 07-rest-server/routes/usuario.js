
var express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
var router = express.Router();
const Usuario = require('../models/usuario');
const { verificaToken, verifyAdminRole } = require('../middlewares/authentication');


router.get('/', verificaToken, (req, res, next) => {
    const skip = req.query.desde || 0;
    const limit = req.query.hasta || 10;
    Usuario
    .find({estado: true}, 'nombre email role estado google')
    .skip(Number(skip))
    .limit(Number(limit))
    .exec((err, usuarios) => {
        if(err) {
            return res.status(400)
            .json({
                ok: false,
                message: err
            });
        }
        Usuario.count({estado: true}, (err, count) => {
            res.json({
                ok: true,
                count,
                usuarios
            }) 
        });
    });
});


router.get('/:id',verificaToken , (req, res, next) => {
    const id = req.params.id;
    Usuario
    .find({estado: true})
    .exec((err, usuarios) => {
        if(err) {
            return res.status(400)
            .json({
                ok: false,
                message: err
            });
        }
        res.json({
            ok: true,
            usuarios
        }) 
    });
});

router.post('/', [verificaToken, verifyAdminRole], (req, res, next) => {
    let body = req.body;    
    const {nombre, email, password, role } = body;
    if(!nombre) {
        res.status(400).json({
            ok: false,
            message: 'El nombre es necesario',
        });
    } else {
        const usuario = new Usuario({
            nombre,
            email,
            password: bcrypt.hashSync(password, 10),
            role
        });
        usuario.save((err, usuarioDB) => {
            if(err) {
                return res.status(400)
                .json({
                    ok: false,
                    message: err
                });
            }
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        });
    }
});

router.put('/:id', [verificaToken, verifyAdminRole], (req, res, next) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if(err) {
            return res.status(400)
            .json({
                ok: false,
                message: err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

router.delete('/:id', [verificaToken, verifyAdminRole], (req, res, next) => {
    const id = req.params.id;
    Usuario.findOne({_id: id, estado: false}, (err, existeUsuario) => {
        if(err) {
            return res.status(400)
            .json({
                ok: false,
                message: err
            });
        }        
        if(existeUsuario){
            res.status(204).end();
            return;
        }
        Usuario.findByIdAndUpdate(id, {estado: false}, { new: true }, (err, usuarioDB) => {
            if(err) {
                return res.status(400)
                .json({
                    ok: false,
                    message: err
                });
            }
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        });
    });
});

module.exports = router;