"use strict";

// 3rd Party Resources
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const loger = require("./logger");
//////chat////

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);
// facebook login require
// // Esoteric Resources
const logger = require("./middleware/logger");
const errorHandler = require("./errorhandler/500");
const notFound = require("./errorhandler/404");
const login = require("./routers/login");
const signup = require("./routers/signup");
const { authRouter } = require("./routers/signupCompany");
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
const facebook = require("./facebooklog");
// const google=require("./google")

const department = require("./routers/category/departments");
const company = require("./routers/company-route");
const MyServicesRouter = require("./routers/myservices");
const citySearch = require("./routers/searchByCity");
//block routers
const blockRouter = require("./routers/block/block.users");
const blockAdminRouter = require("./routers/block/block.admin");
//reservationRouter
const reservationRouter = require("./routers/reservation/reservation");
const MyReservationRouter = require("./routers/reservation/serviceProvider");
const userReservationRouter = require("./routers/reservation/userReservations");

// report
const reportRouter = require("./routers/reports/report");

// report for admin
const reportAdminRouter = require("./routers/reports/report.admin");

// admin confirm The services
 const stateUSServicesRouter = require('./routers/services/statusService')

//  const searchBar = require('./routers/search/search.bar')
// const cookieParser = require('cookie-parser')
// // Prepare the express app


// App Level MW
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Application app");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/signin.html");
});

// app.use(express.static(path.join(__dirname,"../log")));

app.get("/home", (req, res) => {
  res.send("welcome to my secret page");
});

// Routes

app.use("/search", Search);
app.use("/search", citySearch);
app.use("/users", signup);
app.use("/users", login);
app.use(paymentRouter);
app.use(services);
app.use(contactUs);
app.use(mostRated);
app.use(lastnews);
app.use(deleteProfileRouter);
app.use(authRouter);
app.use(department);
app.use(company);
// app.use(signupCompany);
app.use(department);
app.use(MyServicesRouter);
app.use(aboutus);
app.use(discount);
app.use(blockRouter);
app.use(blockAdminRouter);
app.use(facebook)
app.use(reservationRouter)
app.use(MyReservationRouter)
app.use(userReservationRouter)
app.use(reportRouter)
app.use(reportAdminRouter)
app.use(reportAdminRouter)
// app.use(google)
// // app.use('/users',authRoutes);
 app.use(stateUSServicesRouter)
app.use("/api/v2", routerV2);

//////chat///
app.use(express.static(path.join(__dirname,"public")));
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

io.on("connection", function(socket){
	socket.on("newuser",function(username){
		socket.broadcast.emit("update", username + " joined the conversation");
	});
	socket.on("exituser",function(username){
		socket.broadcast.emit("update", username + " left the conversation");
	});
	socket.on("chat",function(message){
		socket.broadcast.emit("chat", message);
	});
});


// // Catchalls
app.use(logger);
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (PORT) => {
    server.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};
