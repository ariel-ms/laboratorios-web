const request = require('request');
const cred = require('./credentials.js');

function getCoords(ciudad) {
    const options = {
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json?access_token=pk.eyJ1IjoiYXJpZWxtcyIsImEiOiJjanQyMTd2b3gxcmFqM3lxeGxzam92M2wwIn0.W41dFolFp96XpfLbrrOqVg`,
        method: 'GET',
        json: true
    }
    return request(options, function(err, res, body) {
        let coords = body.features[0].center
        secondRequest(coords)
    });
}

function secondRequest(coords) {
    let lat = coords[0]
    let lon = coords[1]

    const options = {
        url: `https://api.darksky.net/forecast/${cred.key}/${lon},${lat}?lang=es&units=si`,
        method: 'GET',
        json: true
    };

    request(options, function(err, res, body) {
        print(body.currently.summary, body.currently.temperature, body.currently.precipProbability)
    });
}

function print(summary, temp, precipPro) {
    // console.log(summary)
    // console.log(temp)
    // console.log(precipPro)
    console.log(`${summary}. Actualmente esta a ${temp}°C. Hay ${precipPro*100}% de posibilidad de lluvia.`)
}

module.exports = {
    getCoords:getCoords
}