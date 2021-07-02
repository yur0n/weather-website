const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + address + '&limit=1&appid=103d93c647edd7f039de760db67b57f7'
    request({ url: url, json: true }, (error, response) => {
       if (error) {
            callback('Unable to connect to location services', undefined)
       } else if (response.body.length === 0) {
            callback('Unable to find location', undefined)
       } else if (response.body.cod) {
          callback('Unable to find location', undefined)
          } else {
               callback(undefined, {
                    latitude: response.body[0].lat,
                    longitude: response.body[0].lon,
                    location: 'Weather forecast for ' + response.body[0].name
            })
       }
    })
}

module.exports = geocode