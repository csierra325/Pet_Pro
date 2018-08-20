// Requiring path to use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring custom middleware for checking if a user is logged in
require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", function(req, res) {
    db.Pet.findOne({
      where: {
        UserId: req.user.id
      }
    }).then(function(dbPet) {
      if (!dbPet) return res.render("index");
      console.log("CURRENT USER ID", req.user.id);
      db.Todo.findAll({
        where: {
          UserId: req.user.id
        }
      }).then(function(dbPetTodo) {
        res.render("index", {
          msg: "Welcome Camille",
          Todos: dbPetTodo,
          name: dbPet.name,
          about: dbPet.about,
          age: dbPet.age,
          breed: dbPet.breed,
          species: dbPet.species
        });
      });
    });
  });

  app.get("/addPet", function(req, res) {
    res.render("new-pet-form");
  });
};
