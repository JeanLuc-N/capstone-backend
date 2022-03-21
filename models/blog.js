const mongoose = require("mongoose");

const blogShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('Blog', blogShema);