`use strict`
require("dotenv").config()
const { users, service } = require("./models/index-model");
const passport=require("passport")
const session = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const express = require('express');
const googleRoute = express.Router();
googleRoute.use(
    session({
      secret: "melody hensley is my spirit animal",
    })
  );

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    // check first if user already exists in our DB.
    users
      .findOne({
        googleId: profile.id,
      })
      .then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
          //   console.log(profileFields)
          console.log("1111111111111111111111", profile);
          console.log("2222222222222222222", currentUser.token);
        } else {
          const user = new users({
            username: profile._json.name,
            googleId: profile.id,
          });

          user.save().then(() => console.log("user saved to DB."));
          done(null, user);
        }
      });
  }
)
);

passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser((id, done) => {
users.findById(id).then((user) => {
  done(null, user);
});
});

googleRoute.get("/auth/google", passport.authenticate("google",{scope:['email','profile']}));

googleRoute.get(
"/google/callback",
passport.authenticate("google", {
    successRedirect:"/",
  failureRedirect: "/login",
}),
function (req, res) {
  // Successful authentication, redirect home.
  res.redirect("/");
}
);
module.exports=googleRoute