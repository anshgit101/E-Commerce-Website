var express = require("express");
var router  = express.Router();
// var router  = express.Router({mergeParams: true});
var middleware = require("../middleware/index.js")


var Item           = require("../models/items.js");
var Comment        = require("../models/comment.js");
var User           = require("../models/user.js");

// New Comments
router.get("/items/:id/comments/new",middleware.isLoggedIn, function(req,res){
    Item.findById(req.params.id, function(err,item){
        if(err || !item) {
            req.flash("error", "Item not found");
            res.redirect("/items/"+req.params.id);
        } else {
            res.render("comments/new",{item: item});
        }
    });
});

// New comments create
router.post("/items/:id/comments",middleware.isLoggedIn, function(req,res){
    var text= req.body.text;
    Comment.create({
        text: text
    },function(err,comment){
        if(err || !comment) {
            req.flash("error", "Sorry, something went wrong. Try Again");
            res.redirect("/items/"+req.params.id);
        } else {
            Item.findById(req.params.id,function(err,item){
                if(err || !item) {
                    req.flash("error", "Sorry, something went wrong. Try Again");
                    res.redirect("/items/"+req.params.id);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    item.comments.push(comment);
                    item.save();
                    req.flash("success", "Query added");
                    res.redirect("/items/"+req.params.id);
                }
            });
        }
    });
});

router.get("/items/:id/comments/:comment_id/edit",middleware.checkCommentOwnership , function(req,res){
    Item.findById(req.params.id, function(err,item){
        if(err || !item) {
            req.flash("error", "Sorry, something went wrong. Try Again");
            res.redirect("/items/"+req.params.id);
        } else {
            Comment.findById(req.params.comment_id, function(err, comment){
                if(err || !comment) {
                    req.flash("error", "Sorry, something went wrong. Try Again");
                    res.redirect("/items/"+req.params.id);
                } else {
                    res.render("comments/edit",{item: item,comment:comment});
                }
            });
        }
    });
});

router.put("/items/:id/comments/:comment_id",middleware.checkCommentOwnership , function(req,res){
    var newcomment = {
        text: req.body.text
    };
    Comment.findByIdAndUpdate(req.params.comment_id,newcomment,function(err,comment){
        if(err || !comment) {
            req.flash("error", "Sorry, something went wrong. Try Again");
            res.redirect("/items/"+req.params.id);
        } else {
            req.flash("success", "Query Updated");
            res.redirect("/items/"+req.params.id);
        }
    }); 
});

router.delete("/items/:id/comments/:comment_id",middleware.checkCommentOwnership , function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err) {
            req.flash("error", "Sorry, something went wrong. Try Again");
            res.redirect("/items/"+req.params.id);
        } else {
            req.flash("success", "Query Deleted");
            res.redirect("/items/"+req.params.id);
        }
    }); 
});

module.exports = router;
