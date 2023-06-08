var express = require("express");
var router  = express.Router();
// var router  = express.Router({mergeParams: true});
var sanitizer = require("express-sanitizer");
var middleware = require("../middleware/index.js")

var Item           = require("../models/items.js");
var Comment        = require("../models/comment.js");
var User           = require("../models/user.js")

// fuzzy search reg expression return function
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Index Page- Show all items
router.get("/items", function(req,res) {
    // eval(require('locus'));
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search),'gi');
        Item.find({name: regex},function(err,allitems){
            if(err || !allitems || allitems.length<1){
                req.flash("error","Oops..Nothing left");
                res.redirect("/items");
            } else {
                res.render("items/index",{items: allitems});
            }
        });
    } else {
        Item.find({},function(err,allitems){
            if(err || !allitems){
                req.flash("error","Oops..Something went wrong..Try again");
                res.redirect("/items");
            } else {
                res.render("items/index",{items: allitems});
            }
        });
    }
});


// item Creage Page
router.get("/items/new",middleware.isLoggedIn ,function(req,res){
    res.render("items/new");
});

// item Create
router.post("/items",middleware.isLoggedIn ,function(req,res){
    var name             = req.body.name;
    var image            = req.body.image;
    req.body.discription = req.sanitize(req.body.discription);
    var discription      = req.body.discription;
    var price            = req.body.price;
    var hostel           = req.body.hostel;
    var room             = req.body.room;
    var author           = {
                  id : req.user._id,
                  username : req.user.username
                };
    Item.create({
        name:          name,
        image:         image,
        discription:   discription,
        author:        author,
        price:         price,
        hostel:        hostel,
        room:          room
    },function(err,newcreated){
        if(err || !newcreated){
            req.flash("error","Oops..Something went wrong..Try again");
            res.redirect("/items");
        } else {
            req.flash("success", "Product Added");
            res.redirect("/items");
        }
    });
});

// item detail show page
router.get("/items/:id",function(req,res){
    Item.findById(req.params.id).populate("comments").exec(function(err,foundItem){
        if(err || !foundItem) {
            req.flash("error","Oops..Something went wrong..Try again");
            res.redirect("/items/"+req.params.id);
        } else {
            res.render("items/show",{item: foundItem});
        }
    });
});

// Edit item
router.get("/items/:id/edit",middleware.checkItemOwnership, function(req,res){
        Item.findById(req.params.id, function(err, item){
            if(err || !item) {
                req.flash("error","Oops..Something went wrong..Try again");
                res.redirect("/items/"+ req.params.id);
            } else {
                res.render("items/edit",{item: item});
            }
        });
});

// Update item
router.put("/items/:id",middleware.checkItemOwnership, function(req,res){
    req.body.discription = req.sanitize(req.body.discription);
    var updated = {name:req.body.name , image: req.body.image , discription: req.body.discription, price: req.body.price, hostel: req.body.hostel, room: req.body.room};
    Item.findByIdAndUpdate(req.params.id, updated, function(err,item){
        if(err || !item) {
            req.flash("error","Oops..Something went wrong..Try again");
                res.redirect("/items/"+ req.params.id);
        } else {
            req.flash("success","Product Updated");
            res.redirect("/items/"+req.params.id);
        }
    });
});

// Delete item
router.delete("/items/:id",middleware.checkItemOwnership, function(req,res){
    Item.findByIdAndDelete(req.params.id, function(err){
        if(err) {
            req.flash("error","Oops..Something went wrong..Try again");
                res.redirect("/items/"+req.params.id);
        } else {
            req.flash("success","Product Sold..So it is removed");
            res.redirect("/items");
        }
    });
});

module.exports = router;