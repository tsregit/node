var express = require('express');
const app = express();
const usuario = require('./usuario');
const login = require('./login');
const categoria = require('./categoria');
const producto = require('./producto');
const upload = require('./upload');
const imagen = require('./imagen');

app.use('/usuario', usuario);
app.use('/login', login);
app.use('/categoria', categoria);
app.use('/producto', producto);
app.use('/upload', upload);
app.use('/imagen', imagen);

module.exports = app;