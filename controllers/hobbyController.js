let db = require("../models");
let Sequelize = require('sequelize');

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

module.exports = function(app) {

  app.get("/", function(req, res) {
    db.Hobbies.findAll({}).then(function(data){
      let categories = {};

      data.forEach(function(category) {
        categories[toTitleCase(category.category)] = true;
      });

      res.render("all", {categories: Object.keys(categories)} );
      //res.render("all", {hobbies: data} );

    });
  });

  app.get("/api/hobby", function(req, res) {
    db.Hobbies.findAll({}).then(function(data) {
        res.json(data);
    });
  });

  app.get("/hobby", function(req, res) {
    db.Hobbies.findAll({}).then(function(data){
      console.log("data", data[0].name);
      // let hobbyList = {};
      //
      // data.forEach(function(hobby) {
      //   hobbyList[toTitleCase(hobby.name)] = true;
      // });
      // console.log("hobbyList", hobbyList);
      //
      // res.render("hobby", {hobbies: Object.keys(hobbyList)} );
      res.render("hobby", {hobbies: data} );

    });
  });

  // app.get("/api/category/:category", function(req, res) {
  //   db.Hobbies.findAll({}).then(function(data) {
  //     console.log(data);
  //     res.render("hobby", {hobbies: data});
  //   });
  // });


  app.post("/api/users/verify", function(req, res) {
    db.User.findAll({}).then(function(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].username === req.body.username && data[i].password === req.body.password) {
          res.json(true);
        }
      }
    });
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  // app.get("/hobby", function(req, res) {
  //   res.render("hobby");
  // });

  app.get("/add", function(req, res) {
    res.render("add");
  });

  app.get("/newuser", function(req, res) {
    res.render("newuser");
  });

  app.post("/api/user", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/hobby", function(req, res) {
    db.Hobbies.create({
      category: req.body.category,
      name: req.body.name,
      user: req.body.user,
      materials: req.body.materials,
      instructions: req.body.instructions,
      images: req.body.images,
      videos: req.body.videoss
    }).then(function(data) {
      res.json(data);
    });

  });

  }
