const request = require('request')

const forecast = (x, y, callback) => {

    const url = 'https://api.darksky.net/forecast/34c227b94bd1cf88b5c51d7d5553a66e/' + x + ',' + y + '?units=si'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service!', undefined)
        } else if (body.error) { callback('unable to find location!', undefined) }
        else {
            callback(undefined, body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of raining.')
        }
    })
}

module.exports = forecast