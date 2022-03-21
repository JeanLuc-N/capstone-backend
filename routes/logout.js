const express = require("express");
const router = express.Router();
const login = require("./login");
require("dotenv").config();

router.delete("/", (req,res)=>{
    refreshTokens = login.refreshTokens.filter( (c) => c != req.body.token)
    // res.send(refreshTokens)
    //remove the old refreshToken from the refreshTokens list

    res.status(204).send({
        success: true,
        message: "Logged out!"
    });
});

module.exports = router;