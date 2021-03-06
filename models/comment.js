const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
 text: {
      type: String,
      required: true
   },
date: {
      type: Date,
      default: Date.now
   },
post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
   }
 })

module.exports = mongoose.model('comment', commentSchema);