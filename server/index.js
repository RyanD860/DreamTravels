// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const cors = require("cors");
const { json } = require("body-parser");
const passport = require("passport");
const strategy = require("./strategy");
const checkForSession = require("./checkForSession");
const port = 3090;

// CONTROLLERS
const userCont = require("./controllers/userController");
const locCont = require("./controllers/locationsController");

// INITIATING APP
const app = express();
app.use(cors());
app.use(json());

// CONNECTING TO DATABASE
massive(process.env.CONN_STRING).then(db => {
  console.log("Connected to Db");
  app.set("db", db);
});

// INITIATING SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000000 }
  })
);

// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
app.use(checkForSession);

passport.use(strategy);
passport.serializeUser((profile, done) => {
  done(null, profile);
});

passport.deserializeUser((profile, done) => {
  done(null, profile);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/me",
    failureRedirect: "/login",
    failureFlash: true
  })
);

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/me",
    failureRedirect: "/login",
    failureFlash: true
  })
);
app.get("/me", function(req, res, next) {
  if (!req.user.id) {
    res.redirect("/login");
  } else {
    userCont.checkForUser(req);
    res.redirect(`http://localhost:3000`);
  }
});

app.get("/api/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.send({ message: "logged out" });
  });
});

// END POINTS

// GETS
app.get("/api/user", userCont.getUser);
app.get("/api/user/haves", locCont.getUserHaves);
app.get("/api/user/wants", locCont.getUserWants);
app.get("/api/place/find/:place", locCont.findPlace);
app.get("/api/place/auto/:search", locCont.autoCompletePlace);
app.get("/api/place/photo/:photoRef", locCont.getPhoto);
// POSTS
app.post("/api/add/want", locCont.addToWant);
app.post("/api/add/have", locCont.addToHave);
// EDITS

// DELETES
app.delete("/api/remove/have/:id", locCont.removeFromHave);
app.delete("/api/remove/want/:id", locCont.removeFromWant);

app.listen(port, () => [console.log(`Listening on port ${port}`)]);
