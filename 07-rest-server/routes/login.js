var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
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


const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
    
  }

router.post('/google', async (req, res, next) => {
    let token = req.body.idtoken;
    const googleUser = await verify(token).catch(err => {
        res.status(403).json({
            ok: false,
            error: err 
        });
    });
    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        if(usuarioDB){
            if(!usuarioDB.google) {
                return res.status(500).json({
                    ok: false,
                    error: {
                        message: 'Debe usar su autenticación normal'
                    }
                }); 
            }  else {
                const token = jwt.sign({
                    usuario: usuarioDB,
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN});
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                });
            }
        } else {
            // Si el usuario no existe en la BD
            const usuario = new Usuario();
            usuario.nombre = googleUser.name;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = '.';
            usuario.save((err, usuarioDB) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        error: err
                    });
                }
                const token = jwt.sign({
                    usuario: usuarioDB,
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN});

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                });
            })
            
        }
    });

});

module.exports = router;