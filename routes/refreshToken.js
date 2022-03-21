const express = require("express");
const router = express.Router();
const login = require("./login");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", (req,res) => {

    const token = req.body.token;

    if (!login.refreshTokens.includes(token)) res.status(400).send("Refresh Token Invalid");

    refreshTokens = login.refreshTokens.filter( (c) => c != token);
    //remove the old refreshToken from the refreshTokens list

    const verified = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);

    const accessToken = login.generateAccessToken ({user: verified.user});
    const refreshToken = login.generateRefreshToken ({user: verified.user});
    //generate new accessToken and refreshTokens
    res.status(200).json({accessToken: accessToken, refreshToken: refreshToken});

    });

module.exports = router;