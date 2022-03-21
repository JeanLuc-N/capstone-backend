const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Subscriber', subSchema);