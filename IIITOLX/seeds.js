var mongoose = require("mongoose");
var Item= require("./models/items.js")
var Comment = require("./models/comment");

var data = [
    { name: "Him1", 
    image: "https://images.unsplash.com/photo-1575832512985-52192bf35228?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
    discription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, , comes from a line in section 1.10.32."},
    { name: "Him2", image: "https://images.unsplash.com/photo-1571534402214-7b4dd10f0c7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    discription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, , comes from a line in section 1.10.32.h"},
    { name: "Him3", image: "https://images.unsplash.com/photo-1589399516942-c3fb650ae8b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
    discription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, , comes from a line in section 1.10.32."},
    { name: "Him4", image: "https://images.unsplash.com/photo-1573939843612-aa339e55f8bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
    discription: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32."}
];

function seedDB() {
    Item.deleteMany({}, function(err){
        if(!err) {
            console.log("remove items");
            data.forEach(function(seed){
                Item.create(seed, function(err,item){
                    if(!err) {
                        console.log("Item Created");
                        Comment.create({
                            text: "blah blah",
                            author: "Homer"
                        }, function(err,comment){
                            item.comments.push(comment);
                            item.save();
                            console.log("Created comment");
                        });
                    }
                });
            });
        }
    });
};
module.exports = seedDB;