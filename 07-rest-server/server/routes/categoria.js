
var express = require('express');
var router = express.Router();
const Categoria = require('../models/categoria');
const { verificaToken, verifyAdminRole } = require('../middlewares/authentication');

router.get('/', verificaToken, (req, res, next) => {
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre email')
    .exec((err, categoriaDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                error: {
                    message: err
                }
            });
        }

        Categoria.count({}, (err, count) => {
            res.json({
                ok: true,
                count,
                categoria: categoriaDB
            })
        });
    });

});

router.get('/:id', verificaToken, (req, res, next) => {
    const id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if(err) {
            return res.status(500)
            .json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        if(!categoriaDB) {
            return res.status(400)
            .json({
                ok: false,
                error: {
                    message: err
                }
            }); 
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
});

router.post('/', verificaToken, (req, res, next) => {
    const body = req.body;
    if(!body.descripcion) {
        return res.status(422).json({
            ok: false,
            error: {
                message: "La descripción es necesaria"
            }
        });
    }
    const categoria = new Categoria();
    categoria.descripcion = body.descripcion;
    categoria.usuario = req.usuario._id;
    categoria.save((err, categoriaDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        if(!categoriaDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: err
                }
            }); 
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

router.put('/:id', verificaToken, (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    if(!body.descripcion) {
        return res.status(422).json({
            ok: false,
            error: {
                message: "La descripción es necesaria"
            }
        });
    }
    Categoria.findByIdAndUpdate(id, {descripcion: body.descripcion}, { new: true, runValidators: true }, (err, categoriaDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

router.delete('/:id', [verificaToken, verifyAdminRole], (req, res, next) => {
    // Solo un ADMIN puede borrar la categoria. Borrar la categoria, no cambiar de estado
    const id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        if(categoriaDB){
            return res.json({
                ok: true,
                message: `La categoria ${categoriaDB.descripcion} fue eliminada.`
            });
        } 
        res.status(204).end();
    });
});

module.exports = router;