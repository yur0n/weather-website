const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=103d93c647edd7f039de760db67b57f7&units=metric'
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (response.body.code) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                today : `Right now it's ${response.body.current.weather[0].description}. The temperature is ${Math.round(response.body.current.temp)} degrees. Feels like ${Math.round(response.body.current.feels_like)} degrees.`,
                tomorrow : 'Tomorrow it will be ' + response.body.daily[1].weather[0].description + ', with the temperature ' + Math.round(response.body.daily[1].temp.day) + ' degrees.'
            })
        }
    })
}

module.exports = forecast