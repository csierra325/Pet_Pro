// Requiring models and passport
var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function(app) {
  // Using the passport.authenticate middleware
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // sending the user back the route to the members page
    res.json("/members");
  });
  // Route for signing up a user,otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });
  //
  // Route for logging user out
  app.get("/logout", function(req, res) {
    console.log("testing 123");
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id not password
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // pet profiles
  app.get("/api/pets/:id", function(req, res) {
    if (req.params.id) {
      db.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(result) {
        return res.json(result);
      });
    } else {
      db.findAll({}).then(function(result) {
        return res.json(result);
      });
    }
  });

  // If a user sends data to add a new pet...
  app.post("/api/pets", function(req, res) {
    var pet = req.body;
    var routeName = pet.name.replace(/\s+/g, "").toLowerCase();
    db.Pet.create({
      routeName: routeName,
      name: pet.name,
      description: pet.description,
      age: pet.age,
      breed: pet.breed,
      species: pet.species,
      UserId: req.user.id
    }).then(function(dbPet) {
      // TODO: do something with dbPet
      res.json(dbPet);
    });
  });

  // Create a new example
  app.post("/api/todos", function(req, res) {
    console.log("NEW TODO:", req.body);
    db.Todo.create({
      todo: req.body.todo,
      dueDate: req.body.dueDate
    }).then(function(petTodoDB) {
      res.json(petTodoDB);
    });
  });

  app.get("/api/todos", function(req, res) {
    db.Todo.findAll({}).then(function(petTodoDB) {
      res.json(petTodoDB);
    });
  });

  // Delete an example by id
  app.delete("/api/todos/:id", function(req, res) {
    db.Todo.destroy({ where: { id: req.params.id } }).then(function(petTodoDB) {
      res.json(petTodoDB);
    });
  });
};
