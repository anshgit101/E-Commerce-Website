var express = require("express");
var router  = express.Router();
// var router  = express.Router({mergeParams: true});
var middleware = require("../middleware/index.js")

var Item           = require("../models/items.js");
var Comment        = require("../models/comment.js");
var User           = require("../models/user.js")
var Reply          = require("../models/reply.js")

router.get("/items/:id/comments/:comment_id/reply/new", middleware.isLoggedIn ,function(req,res){
    res.render("reply/new",{item_id: req.params.id, comment_id: req.params.comment_id});
});

router.post("/items/:id/comments/:comment_id/reply",middleware.isLoggedIn, function(req,res){
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newreply = {text: req.body.text, author: author};
    Reply.create(newreply,function(err,reply){
        Comment.findById(req.params.comment_id, function(err,comment){
            if(err || !comment) {
                req.flash("error","Oops..Something went wrong..Try again");
                res.redirect("/items"+req.params.id);
            } else {
                comment.replies.push(reply);
                comment.save();
                req.flash("success", "Replied");
                res.redirect("/items/"+ req.params.id);
            }
        });
    });
})

module.exports = router;