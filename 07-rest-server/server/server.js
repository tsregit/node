require('./config/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

app = express();

// default options
app.use(fileUpload());

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes'));

app.use(express.static(path.resolve(__dirname , 'public')));

mongoose.connect(process.env.URL_DB, (err, resp) => {
    if(err) throw err;
    console.log("Base de datos online");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});