const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const validateToken = require("../middleware/auth");

// send messages
router.post('/', async(req, res)=>{
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });

    try {
        await contact.save();
        res.send("message sent successful");
    } catch (error) {
        res.status(400).send("Error" + error);
    }
});

// get all messages
router.get('/messages', validateToken, async(req, res)=>{
    const messages = await Contact.find();
    res.json(messages);
});

// get message by id
router.get('/messages/:id', validateToken, async(req, res)=>{
    const message = await Contact.findById(req.params.id);
    res.send(message);
})

module.exports = router;