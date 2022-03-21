const express = require("express");
const router = express.Router();
const User = require("../models/user");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const validateToken = require("../middleware/auth");

// get all users
router.get("/", validateToken, async(req, res)=>{
    const users = await User.find();

    if(!users.length){
        res.send({message: "no user found"});
    } else {
        res.json(users);
    }
});


// get user by id
router.get('/:id', validateToken, async(req, res)=>{
    try {
        const id = req.params.id;
        await User.findById(id).then(data=>{
            if(!data){
                res.status(404).send({message: `User not found with id ${id}`});
            } else {
                res.json(data);
            }
        });
    } catch (error) {
        res.status(500).send("Error"+ error);
    }
});


module.exports = router;