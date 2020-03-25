process.env.PORT = process.env.PORT || 3009;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB = '';

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
} 
process.env.URL_DB = urlDB;

//==========================
// Vencimiento token
//
// 60 seg
// 60 min
// 24 hrs
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30



//===================
// SEED de autenticación

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

process.env.CLIENT_ID = process.env.CLIENT_ID || '832078323825-fnk881gstl52evq66scgfc3n8ph3iqkf.apps.googleusercontent.com' 