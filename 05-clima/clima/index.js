const axios = require('axios');

const getClima = async ( lat, lng) => {
   const rsp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=88313b6e425625363f479d7412e091b8&units=metric`);
   if(rsp.data && rsp.data.main) {
        return rsp.data.main.temp;
   }
   throw new Error(`No hay resultados`);
}

module.exports = {
    getClima
}