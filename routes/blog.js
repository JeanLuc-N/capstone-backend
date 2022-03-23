const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const validateToken = require("../middleware/auth");


/**
*  @swagger
*  tags:
*    name: Blog
*    description: API to manage your Blogs.
*/

/**
 * @swagger
 * definitions:
 *   Blog:
 *     properties:
 *       title:
 *         type: string
 *       summary:
 *         type: string
 *       image:
 *         type: string
 *       content:
 *         type: string
 */

// create new Blog Doc
/**
 * @swagger
 * /blog/save:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create Blog API
 *     description: Creates a new Blog
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         required: true
 *       - in: formData
 *         name: image
 *         type: file
 *         description: body of the blog
 *         schema:
 *           $ref: '#/definitions/Blog'
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               fileName:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Company Successfully created
 *       500:
 *         description: error
 */

//get all blog

/**
 * @swagger
 * /blog/:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Retrieve all Blog API
 *     description: Returns all Blogs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all blogs
 *         schema:
 *           $ref: '#/definitions/Blog'
 */

// get one blog

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Retrieve single Blog API
 *     description: Returns a single Blog
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Blog's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Blog
 *         schema:
 *           $ref: '#/definitions/Blog'
 */

/**
  * @swagger
  * /blog/delete:
  *   delete:
  *     tags:
  *       - Blog
  *     summary: Delete blog API
  *     description: Deletes a single Blog
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: authorization
  *         in: header
  *         required: true
  *     responses:
  *       200:
  *         description: Successfully deleted
  */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/blog'));
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');

// save blog
router.post('/save', validateToken, uploadImg, async(req, res)=>{
    const blog = new Blog({
        title: req.body.title,
        summary: req.body.summary,
        image: req.file.path,
        content: req.body.content,
    });

    try {

        await blog.save();
        res.status(200).send({
            success: true,
            message: "Blog saved successful"
        });
        
    } catch (error) {
        res.status(500).send("Error"+ error);
    }

});

// get all blogs
router.get('/', async(req, res)=>{
    try {
        const blogs = await Blog.find();
        if(blogs.length){
            res.status(200).json(blogs);
        } else {
            res.status(201).send("no blog found");
        }
    } catch (error) {
        res.status(500).send("error"+ error);
    }
});

//get blog by id
router.get('/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        await Blog.findById(id).then(data=>{
            if(!data){
                res.status(204).send({
                    success: true,
                    message: `Blog not found with id ${id}`
                });
            } else {
                res.status(200).json(data);
            }
        });
    } catch (error) {
        res.status(500).send("Error"+ error);
    }
});

// delete blog by id
router.delete('/delete/:id', validateToken, async(req, res)=>{
    const id = req.params.id;

    try {
        const blog = await Blog.findById(id);
        const imageLink =  blog.image;

        await Blog.findByIdAndDelete(id).then(data=>{
            if(!data){
                res.status(404).send({
                    message: `Cannot Delete Blog with id=${id}. Maybe Blog was not found!`
                  });
            } else {
                fs.unlinkSync(imageLink);
                res.send({ message: "Blog was Deleted successfully." });
            }
        });
    } catch (error) {
        res.status(500).send("error"+ error);
    }
});

//delete all blog
router.delete('/delete', validateToken, async(req, res)=>{
    await Blog.deleteMany({})
    .then(data => {
        res.status(200).send({
          success: true,
          message: `${data.deletedCount} Blogs were deleted successfully!`
        });
      })
})

// update a blog
router.put('/update/:id', validateToken, uploadImg, async(req, res)=>{
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty!"
          });
    } else {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        const imageLink =  blog.image;

        Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data =>{
            if(!data){
                res.status(204).send(`Blog with id ${id} not found`);
            } else {
                fs.unlinkSync(imageLink);
                res.status(200).send({
                    success: true,
                    message: "Blog updated successful"
                });
            }
        });
    }
});

module.exports = router;