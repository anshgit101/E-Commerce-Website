var mongoose       = require("mongoose");
var express        = require("express");
var app            = express();
var parser         = require("body-parser");
var passport       = require("passport");
var ls             = require("passport-local");
var plm            = require("passport-local-mongoose");
var session        = require("express-session");
var mo             = require("method-override");
var sanitizer      = require("express-sanitizer");
var flash          = require("connect-flash");

var Item           = require("./models/items.js");
var Comment        = require("./models/comment.js");
var User           = require("./models/user.js");
var Reply          = require("./models/reply.js");

var seedDB         = require("./seeds");

// Requiring Routes
var itemsRoutes         = require("./routes/items");
var commentsRoutes      = require("./routes/comments");
var indexRoutes         = require("./routes/index");
var replyRoutes         = require("./routes/reply.js");

// Seeding
// seedDB();

// Setting up Mongoodb
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
// mongoose.connect("mongodb://localhost/bas");
mongoose.connect("mongodb+srv://him:Franklife23%40@ha-ywlsq.mongodb.net/test?retryWrites=true&w=majority");

app.use(parser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.use(mo("_method"));
app.set("view engine","ejs");

app.use(sanitizer());

app.use(flash());

// Authentication Setup
app.use(session({
    secret: "Rusty is a good dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new ls(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Passing User in all Routes
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Using Routes
app.use(itemsRoutes);
    // app.use("/items",itemsRoutes);
app.use(commentsRoutes);
    // app.use("/items/:id/comments",commentsRoutes);
app.use(indexRoutes);
    // app.use("/",indexRoutes);
app.use(replyRoutes);

app.get("*", function(req,res){
    // req.flash("error", "Oops..site doesn't exists");
    res.redirect("/items");
});

//  Hosting
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("App started");
});