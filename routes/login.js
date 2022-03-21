const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");

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
         res.status(404).send({message: "User does not exists!"});
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