var express = require('express');
const app = express();
const usuario = require('./usuario');
const login = require('./login');

app.use('/usuario', usuario);
app.use('/login', login);

module.exports = app;