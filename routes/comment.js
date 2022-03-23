const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/blog');
const router = express.Router();

//add comments

router.post('/post/:id/comment', async (req, res) => {
   const id = req.params.id;
   const comment = new Comment({
   text: req.body.comment,
   post: id
})
  // save comment
await comment.save();
const postRelated = await Post.findById(id);
postRelated.comments.push(comment);
await postRelated.save(function(err) {
        res.send({
            data:comment,
            status:'Ok',
            message:'comment added successfuly'
        });
})

})

router.get('/comment', async(req,res)=> {
      const comment = await Comment.find()
      res.json(comment)
  
})

module.exports = router;