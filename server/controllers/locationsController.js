const axios = require("axios");
require("dotenv").config();
module.exports = {
  getUserHaves: function(req, res, next) {
    const db = req.app.get("db");
    db.getUserHaves([req.session.user.id]).then(resp => {
      res.send(resp);
    });
  },
  getUserWants: function(req, res, next) {
    const db = req.app.get("db");

    db.getUserWants([req.session.user.id]).then(resp => {
      res.send(resp);
    });
  },
  findPlace: function(req, res, next) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
          req.params.place
        }&key=${process.env.placesAPI}`
      )
      .then(resp => {
        res.send(resp.data.result);
      })
      .catch(err => console.log(err));
  },
  autoCompletePlace: function(req, res, next) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
          req.params.search
        }a&key=${process.env.placesAPI}`
      )
      .then(resp => {
        res.send(resp.data.predictions);
      })
      .catch(err => console.log(err));
  },
  getPhoto: function(req, res, next) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${
          req.params.photoRef
        }&key=${process.env.placesAPI}
`
      )
      .then(resp => {
        res.send(resp.data);
      })
      .catch(err => console.log(err));
  },
  addToWant: function(req, res, next) {
    const db = req.app.get("db");
    db.addToWant([
      req.session.user.id,
      req.body.long,
      req.body.lat,
      req.body.name
    ])
      .then(resp => {
        res.send(resp);
      })
      .catch(err => console.log(err));
  },
  addToHave: function(req, res, next) {
    const db = req.app.get("db");
    db.addToHave([
      req.session.user.id,
      req.body.long,
      req.body.lat,
      req.body.name
    ])
      .then(resp => {
        res.send(resp);
      })
      .catch(err => console.log(err));
  },
  removeFromHave: function(req, res, next) {
    const db = req.app.get("db");
    db.removeFromHave([req.params.id, req.session.user.id])
      .then(resp => {
        res.send(resp);
      })
      .catch(err => console.log(err));
  }
};
