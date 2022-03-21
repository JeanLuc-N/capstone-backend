const express = require("express");
const router = express.Router();
const User = require("../models/user");
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const bcrypt = require ('bcrypt');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/user'));
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');


// register user
router.post('/', uploadImg, async(req, res)=>{
    const email = req.body.email;
    const user = await User.find({email: email});

    if(user.length){
        res.send({message: "user already exist with the same email"});
    } else {
        if(req.body.password == req.body.verifyPassword){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const usr = new User({
                name: req.body.name,
                email: req.body.email,
                image: req.file.path,
                password: hashedPassword,
                role: req.body.role
            });

            try {
                await usr.save();
                res.send({message: "user saved successful"});
            } catch (error) {
                res.status(400).send("error "+error);
            }
        } else {
            res.status(400).send({message: "password does not match"});
        }
    }
});


module.exports = router;