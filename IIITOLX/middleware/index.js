var Item           = require("../models/items.js");
var Comment        = require("../models/comment.js");
var User           = require("../models/user.js");

var middlewareObj = {};

middlewareObj.isLoggedIn= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Please login First");
        res.redirect("/login");
    }
};

middlewareObj.checkItemOwnership = function(req,res,next) {
    if(req.isAuthenticated()) {
        Item.findById(req.params.id, function(err, item){
            if(err || !item) {
                req.flash("error", "Item not found")
                res.redirect("back");
            } else {
                if(item.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                        req.flash("error", "Sorry, you don't have permission to do that");
                        res.redirect("/items/"+req.params.id);
                    }
                }
        });
    } else {
        req.flash("error", "Please login First");
        res.redirect("/login");
        }
}

middlewareObj.checkCommentOwnership = function(req,res,next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err || !comment) {
                req.flash("error", "Comment not found")
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "Sorry, you don't have permission to do that");
                    res.redirect("back");
                    }
                }
        });
    } else {
        req.flash("error", "Please login First");
        res.redirect("/login");
        }
}



module.exports = middlewareObj;