const axios = require('axios');

const getLugarLatLng = async ( direccion ) => {
    const encodeUrl = encodeURI(direccion);
    const instance = axios.create({
        url: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeUrl}`,
        headers: {
            'x-rapidapi-key': '67a143c749msh9483fc63a1cfcfdp1a6b31jsn37ecae3fddb4'
        }
    });
    
    const rsp = await instance.get();
    if(!rsp.data.Results.length){
        throw new Error(`No hay resultados para ${direccion}`);
    }
    const data = rsp.data.Results[0];
    const nombreDireccion = data.name;
    const lat = data.lat;
    const lng = data.lon;
    return {
        direccion: nombreDireccion,
        lat,
        lng,
    }

};

module.exports = {
    getLugarLatLng
}