var express = require('express');
const app = express();
const usuario = require('./usuario');
const login = require('./login');
const categoria = require('./categoria');
const producto = require('./producto');

app.use('/usuario', usuario);
app.use('/login', login);
app.use('/categoria', categoria);
app.use('/producto', producto);

module.exports = app;