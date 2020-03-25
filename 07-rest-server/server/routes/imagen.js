
var express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { verifyTokenImagen } = require('../middlewares/authentication');

router.get('/:tipo/:img', verifyTokenImagen, (req, res) => { 
    const tipo = req.params.tipo;
    const img = req.params.img;
    const pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    const noImagePath = path.resolve(__dirname, '../assets/no_image_found.jpg');
    if(fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.sendFile(noImagePath);
    }
});

module.exports = router;