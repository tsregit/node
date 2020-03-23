const express = require('express');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 8085;

require('./hbs/helpers');

app.use(express.static( __dirname + '/public'));

//Express HBS engine
hbs.registerPartials( __dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'juan'
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
    
});
