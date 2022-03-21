const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribe');
const validateToken = require("../middleware/auth");


// subscribe
router.post('/', async(req, res)=>{

    const email = req.body.email;
    const subscriber = await Subscriber.find({email: email});

    if(!subscriber.length){

        const subscribe = new Subscriber({
            email: req.body.email,
        });
    
        try {
            await subscribe.save();
            res.status(201).send({
                success: true,
                message: "thanks for your subscription"});
            
        } catch (error) {
            res.status(500).send("save error"+ error);
        }
    } else {
        res.status(409).send({
            success: false,
            message: "you already subscribed with this email"});
    }

});

// get all subscribers
router.get('/subscribers', validateToken, async(req, res)=>{
    const subscribers = await Subscriber.find();
    if(subscribers.length) {
        res.status(201).json(subscribers);
    } else {
        res.status(204).send({
            success: false,
            message: "no subscribers found"
        });
    }
});

// delete all subscriber
router.delete('/delete', validateToken, async(req, res)=>{
    const subscribers = await Subscriber.find();
    if(subscribers.length) {
        await Subscriber.deleteMany({})
        res.status(202).send({
            success: true,
            message: `${subscribers.length} subscribers deleted`
        });
    } else {
        res.status(204).send({
            success: false,
            message: "no subscribers found"
        });
    }
    
})

module.exports = router;