var mongoose = require("mongoose");
var itemSchema = new mongoose.Schema({
    name: String,
    image: String,
    discription: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    price: Number,
    hostel: String,
    room: Number
});
var Item = mongoose.model("Item", itemSchema);

module.exports = Item;