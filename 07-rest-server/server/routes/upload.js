const express = require('express');
const routes = express.Router();
const fs = require('fs');
const path = require('path');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

routes.put('/:tipo/:id', (req, res) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'No files were uploaded.'
            }
        });
      }
      let tiposValidos = ['productos', 'usuarios'];
      if( tiposValidos.indexOf(tipo) < 0){
        return res.status(400).json({
            ok: false,
            error:{
                message: `Las tipos permitidos son: ${tiposValidos.join(', ')}`
            }
        })
    }
      const archivo = req.files.archivo;
      const nombreArchivo = archivo.name.split('.');
      const extension = nombreArchivo[nombreArchivo.length - 1];
      let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
      if( extensionesValidas.indexOf(extension) < 0){
          return res.status(400).json({
              ok: false,
              error:{
                  message: `Las extensiones validas son: ${extensionesValidas.join(', ')}`,
                  ext: extension
              }
          })
      }
    let nuevoNombre = `${id}-${new Date().getMilliseconds()}.${extension}`;    
    // Use the mv() method to place the file somewhere on your server
    archivo.mv(path.resolve(__dirname, `../../uploads/${tipo}/${nuevoNombre}`), (err) => {
        if (err)
        return res.status(500).json({
            ok: false,
            error: {
                message: err
            }
        });
        // Imagen esta cargada
        if(tipo === 'usuarios') {
            imagenUsuario(id, res, nuevoNombre);
        } else {
            imagenProducto(id, res, nuevoNombre);
        }
    });
});

const imagenUsuario = (id, res, nombreArchivo) => {
    Usuario.findById(id, (err, usuarioDB) => {
        if(err) {
            borrarArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        if(!usuarioDB) {
            borrarArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no existe'
                }
            });
        }
        borrarArchivo(usuarioDB.img, 'usuarios');
        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        });
    })
};

const imagenProducto = (id, res, nombreArchivo) => {
    Producto.findById(id, (err, productoDB) => {
        if(err) {
            borrarArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                error: {
                    message: err
                }
            });
        }
        if(!productoDB) {
            borrarArchivo(nombreArchivo, 'productos');
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Producto no existe'
                }
            });
        }
        borrarArchivo(productoDB.img, 'productos');
        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });
        });
    })
};

const borrarArchivo = (nombreArchivo, tipo) => {
    const pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreArchivo}`);
    if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
    }
};

module.exports = routes;