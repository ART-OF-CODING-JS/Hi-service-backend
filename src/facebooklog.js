// `use strict`
// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// const session = require("express-session");
// const { users, service } = require("./models/index-model");
// const express = require('express');
// const faceRoute = express.Router();
// faceRoute.use(
//     session({
//       secret: "melody hensley is my spirit animal",
//     })
//   );

// passport.use(
//     new FacebookStrategy(
//       {
//         clientID: process.env.CLIENT_ID_FB,
//         clientSecret: process.env.CLIENT_SECRET_FB,
//         callbackURL: "http://localhost:3000/auth/facebook/home",
//         profileFields: ["id", "displayName", "emails", "photos"],
//       },
//       (accessToken, refreshToken, profile, done) => {
//         // check first if user already exists in our DB.
//         users
//           .findOne({
//             facebookId: profile.id,
//           })
//           .then((currentUser) => {
//             if (currentUser) {
//               done(null, currentUser);
//               //   console.log(profileFields)
//               console.log("1111111111111111111111", profile);
//               console.log("2222222222222222222", currentUser.token);
//             } else {
//               const user = new users({
//                 username: profile._json.name,
//                 facebookId: profile.id,
//               });
  
//               user.save().then(() => console.log("user saved to DB."));
//               done(null, user);
//             }
//           });
//       }
//     )
//   );
  
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser((id, done) => {
//     users.findById(id).then((user) => {
//       done(null, user);
//     });
//   });
  
//   faceRoute.get("/auth/facebook", passport.authenticate("facebook"));
  
//   faceRoute.get(
//     "/auth/facebook/home",
//     passport.authenticate("facebook", {
//       failureRedirect: "/login",
//     }),
//     function (req, res) {
//       // Successful authentication, redirect home.
//       res.redirect("/");
//     }
//   );

//   module.exports=faceRoute

