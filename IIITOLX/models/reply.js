var mongoose = require("mongoose");

var replySchema = new mongoose.Schema({
    text: String,
    author: {
        username: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});

module.exports = mongoose.model("Reply", replySchema);
