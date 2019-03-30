const request = require("request")
require('dotenv').config()

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_SECRET_KEY}/${latitude},${longitude}?units=si`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      const msg = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability * 100}% chance of rain.`;
      callback(undefined, msg)
    }
  })
}

module.exports = forecast
