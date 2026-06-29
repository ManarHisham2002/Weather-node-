const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
app.set("view engine", "hbs");
const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));

// Add Another InterFace, If you Want Last (old) InterFace can comment line 10 & 11
const viewsPath = path.join(__dirname, "viewsNew");
app.set("views", viewsPath);

const geocode = require("./data/geo");
const forecast = require("./data/forecast");
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location: forecastData.location,
        temperature: forecastData.temperature,
        condition: forecastData.condition,
      });
    });
  });
});
app.get("*", (req, res) => {
  res.render("notFound");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
