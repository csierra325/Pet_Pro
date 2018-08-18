// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var exphbs = require("express-handlebars");
// Requiring passport
var passport = require("./config/passport");
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Configure handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
//
// Requiring routes

// Middleware for protected routes
app.use(function(req, res, next) {
  var protectedRoutes = ["/members", "/addPet", "/api/user_data"];
  if (!protectedRoutes.includes(req.url) || req.user) {
    next();
  } else {
    res.redirect("/login");
  }
});

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Render 404 page for any unmatched routes
app.get("*", function(req, res) {
  res.render("404");
});

// Syncing database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
