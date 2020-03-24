var express = require('express');
var router = express.Router();
const Producto = require('../models/producto');
const { verificaToken } = require('../middlewares/authentication');

router.get('/', verificaToken, (req, res, next) => {
    const desde = req.query.desde || 0;
    const hasta = req.query.hasta || 10; 
    Producto.find({disponible: true}, 'usuario nombre precioUni categoria')
    .sort('nombre')
    .skip(desde)
    .limit(hasta)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        Producto.count({ disponible: true}, (err, count) => {
            res.json({
                ok: true,
                count,
                producto: productoDB
            })
        });
    });
});

router.get('/:id', verificaToken, (req, res, next) => {
    const id = req.params.id;
    Producto.find({_id: id, disponible: true}, 'usuario nombre precioUni categoria')
    .sort('nombre')
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        if(!productoDB) {
            return res.status(400)
            .json({
                ok: false,
                error: {
                    message: err
                }
            }); 
        }
        if(productoDB.length) {
            res.json({
                ok: true,
                producto: productoDB[0]
            });
        } else {
            res.status(204).end();
        }
    
    });
});

router.get('/buscar/:termino', verificaToken, (req, res, next) => {
    const termino = req.params.termino;
    const regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex})
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        res.json({
            ok: true,
            productos: productoDB
        });
    });
});

router.post('/', verificaToken, (req, res, next) => {
    const { nombre, precioUni, descripcion, disponible, categoria } = req.body;
    const producto = new Producto({
        usuario: req.usuario._id,
        nombre,
        precioUni,
        descripcion,
        disponible,
        categoria
    });  
    producto.save((err, productoDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        res.status(201).json({
            of: true,
            producto: productoDB
        });
    });
});

router.put('/:id', verificaToken, (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Producto.findById(id, (err, productoDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        if(!productoDB) {
            return res.status(400)
            .json({
                ok: false,
                error: {
                    message: err
                }
            }); 
        }
        const { nombre, precioUni, descripcion, disponible } = body;
        productoDB.nombre = nombre;
        productoDB.precioUni = precioUni;
        productoDB.descripcion = descripcion;
        productoDB.disponible = disponible;
        productoDB.save((err, productoGuardado) => {
            if(err) {
                return res.status(500)
                .json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoGuardado
            })
        });
    });
});

router.delete('/:id', verificaToken, (req, res, next) => {
    const id = req.params.id;
    Producto.findById(id, (err, productoDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        if(!productoDB) {
            return res.status(400)
            .json({
                ok: false,
                error: {
                    message: err
                }
            }); 
        }
        if(productoDB.disponible) {
            productoDB.disponible = false;
            productoDB.save((err, productoGuardado) => {
                if(err) {
                    return res.status(500)
                    .json({
                        ok: false,
                        error: {
                            message: err
                        }
                    });
                }
                res.json({
                    ok: true,
                    producto: productoGuardado,
                    message: 'Producto Borrado'
                });
            });
        } else {
            res.status(204).end();
        }

    });
});

module.exports = router;