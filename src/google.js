`use strict`
const { users, service } = require("./models/index-model");
const passport=require("passport")
const session = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID="276381653713-v0lgg8laoiughdibpka6dhlkbn6avq4g.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"
const express = require('express');
const googleRoute = express.Router();
googleRoute.use(
    session({
      secret: "melody hensley is my spirit animal",
    })
  );

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
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

googleRoute.get("/auth/google", passport.authenticate("google"));

googleRoute.get(
"/auth/google/callback",
passport.authenticate("google", {
  failureRedirect: "/login",
}),
function (req, res) {
  // Successful authentication, redirect home.
  res.redirect("/");
}
);
module.exports=googleRoute