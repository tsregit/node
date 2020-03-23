require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const usuario = require('./routes/usuario');

app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/usuario', usuario);

mongoose.connect(process.env.URL_DB, (err, resp) => {
    if(err) throw err;
    console.log("Base de datos online");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
    
});