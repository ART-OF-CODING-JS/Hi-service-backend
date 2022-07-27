"use strict";

// 3rd Party Resources
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// facebook login require
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const { users, service } = require("./models/index-model");
// // Esoteric Resources
const logger = require("./middleware/logger");
const errorHandler = require("./errorhandler/500");
const notFound = require("./errorhandler/404");
const login = require("./routers/login");
const signup = require("./routers/signup");
const {authRouter}=require("./routers/signupCompany")
// const signupCompany = require("./routers/signupCompany");

const contactUs = require("./routers/contactUs");
const Search = require("./routers/searchbyname");
const routerV2 = require("./routers/api");
const paymentRouter = require("./routers/payment");
const services = require("./routers/services");
const mostRated = require("./routers/mostRated");
const lastnews = require("./routers/lastNewServices");
const aboutus = require("./routers/aboutus");
const discount = require("./routers/discountServices");
const deleteProfileRouter = require("./routers/deleteProfile");

const department = require('./routers/category/departments')
const company=require("./routers/company-route")
const MyServicesRouter = require('./routers/myservices')
//  const searchBar = require('./routers/search/search.bar')
// const cookieParser = require('cookie-parser')
// // Prepare the express app
const app = express();

// facebook app level
// app.use(
//   session({
//     secret: "melody hensley is my spirit animal",
//   })
// );
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.CLIENT_ID_FB,
//       clientSecret: process.env.CLIENT_SECRET_FB,
//       callbackURL: "http://localhost:3000/auth/facebook/home",
//       profileFields: ["id", "displayName", "emails", "photos"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // check first if user already exists in our DB.
//       users
//         .findOne({
//           facebookId: profile.id,
//         })
//         .then((currentUser) => {
//           if (currentUser) {
//             done(null, currentUser);
//             //   console.log(profileFields)
//             console.log("1111111111111111111111", profile);
//             console.log("2222222222222222222", currentUser.token);
//           } else {
//             const user = new users({
//               username: profile._json.name,
//               facebookId: profile.id,
//             });

//             user.save().then(() => console.log("user saved to DB."));
//             done(null, user);
//           }
//         });
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   users.findById(id).then((user) => {
//     done(null, user);
//   });
// });

// app.get("/auth/facebook", passport.authenticate("facebook"));

// app.get(
//   "/auth/facebook/home",
//   passport.authenticate("facebook", {
//     failureRedirect: "/login",
//   }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

// // App Level MW
// app.use(cors());
// app.use(morgan("dev"));

// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
app.get("/", (req, res) => {
  res.send("Application app");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/signin.html");
});
app.get("/home", (req, res) => {
  res.send("welcome to my secret page");
});

// Routes
app.use("/search", Search);
app.use("/users", signup);
app.use("/users", login);
app.use(paymentRouter);
app.use(services);
app.use(contactUs);
app.use(mostRated);
app.use(lastnews);
app.use(deleteProfileRouter);
app.use(authRouter)
app.use(department);
app.use(company)
// app.use(signupCompany);
app.use(department);
app.use(MyServicesRouter);
app.use(aboutus);
app.use(discount);

// app.use(searchBar)
// // app.use('/users',authRoutes);
app.use("/api/v2", routerV2);
// // Catchalls
app.use(logger);
app.use(notFound);
app.use(errorHandler);




module.exports = {
  server: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};
