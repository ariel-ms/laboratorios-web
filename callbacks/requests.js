const request = require('request');
const cred = require('./credentials.js');

function checks(err, res, body, callback) {
    if (body == undefined){
        callback('No hay conexion con la API.', undefined);
    } 
    if (res.statusCode == 403) {
        callback('La API Key es incorrecta', undefined);
    }
    if (err) {
        callback('El servidor no respone.', undefined);
    }
    if (res.statusCode != 200) {
        callback('Error de conexion', undefined);
    }
}

function getCoords(ciudad, callback) {
    const options = {
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json?access_token=pk.eyJ1IjoiYXJpZWxtcyIsImEiOiJjanQyMTd2b3gxcmFqM3lxeGxzam92M2wwIn0.W41dFolFp96XpfLbrrOqVg`,
        method: 'GET',
        json: true
    }
    return request(options, function(err, res, body) {
        checks(err, res, body, callback);
        let coords = body.features[0].center
        callback(undefined, coords);
    });
}

function getForecast(coords, callback) {
    let lat = coords[0]
    let lon = coords[1]

    const options = {
        url: `https://api.darksky.net/forecast/${cred.key}/${lon},${lat}?lang=es&units=si`,
        method: 'GET',
        json: true
    };

    request(options, function(err, res, body) {
        checks(err, res, body, callback);
        let str = getForecastString(body.currently.summary, body.currently.temperature, body.currently.precipProbability)
        callback(undefined, str);
    });
}

function getForecastString(summary, temp, precipPro) {
    // console.log(summary)
    // console.log(temp)
    // console.log(precipPro)
    return `${summary}. Actualmente esta a ${temp}°C. Hay ${precipPro*100}% de posibilidad de lluvia.`
}

module.exports = {
    getCoords:getCoords,
    getForecast:getForecast
}