var express = require("express");
var router  = express.Router();
var middleware = require("../middleware/index.js")
// var router  = express.Router({mergeParams: true});

var Item     = require("../models/items.js");
var Comment        = require("../models/comment.js");
var User           = require("../models/user.js")

var passport       = require("passport");

// Landing Page
router.get("/", function(req,res){
    res.render("landing");
});

router.get("/contributors", function(req,res){
    res.render("contributor");
});

// Sign Up Page
router.get("/register", function(req,res){
    res.render("register");;
});

// Sign Up
router.post("/register", function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username}),password,function(err, user){
        if(err || !user) {
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success","Signed up successfully");
                res.redirect("/items");
            });
        }
    });
});

// Login Page
router.get("/login", function(req,res){
    res.render("login");
});

// Checking User
router.post("/login", passport.authenticate("local",{
    successRedirect: "/items",
    failureRedirect: "/login"
}) ,function(req,res){
});

// Log out
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "You are logged out!!");
    res.redirect("/items");
});

module.exports = router;

