const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");

// Login endpoint documentation
// Login Schema
/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
/**
// Documentation
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Login API
 *     summary: My brand Login API
 *     description: This is the login API where a registered user should be able to login into mybrand Web app
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: users
 *         description: login
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: User successfully Logged in and the token was generated
 */

// End-point for user to login

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
// router.post("/", async(req,res) => {

//     const email = req.body.email;

//     const user = await User.findOne({email});

//      if(!user){
//          res.status(404).send({message: "User does not exists!"});
//     } else {
        
//         if(await bcrypt.compare(req.body.password, user.password)){
//             if(user.role == "admin"){

//                 const accessToken = generateAccessToken ({user: user.role});

//                 const refreshToken = generateRefreshToken ({user: user.role});
        
//                 res.status(200).json({accessToken: accessToken, refreshToken: refreshToken}); 
//             }
//         } else {
//             res.status(401).send({message: "Password Incorrect!"});
//         }
//     }


// });

router.post("/", async(req,res) => {

    const email = req.body.email;

    const user = await User.findOne({email});

     if(!user){
         res.status(404).send({
             success: true,
             message: "User does not exists!"
            });
    } else {
        
        if(await bcrypt.compare(req.body.password, user.password)){
            if(user.role == "admin"){

                const accessToken = generateAccessToken ({user: user.role});

                const refreshToken = generateRefreshToken ({user: user.role});
        
                res.status(200).json({accessToken: accessToken, refreshToken: refreshToken}); 
            }
        } else {
            res.status(401).send({message: "Password Incorrect!"});
        }
    }


});

// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"});
    }

// refreshTokens
let refreshTokens = [];

function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "15m"});

    refreshTokens.push(refreshToken);

    return refreshToken;
}

module.exports = {
    router: router,
    refreshTokens: refreshTokens,
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken
}