const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=9e6e56d8a3c24fccb1173241262606&q=${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, {
        location: response.body.location.name,
        temperature: response.body.current.temp_c,
        condition: response.body.current.condition.text,
      });
    }
  });
};
module.exports = forecast;
