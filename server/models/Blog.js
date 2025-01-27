const mongoose = require('mongoose');
const User = require('./User');

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    user: {
        type: String,
        ref: 'User'
    },
    item_id: String,
    email: String,
    rating: Number,
    username: String
    });

module.exports = mongoose.model("Blog", blogSchema);