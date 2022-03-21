const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();

const validateToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(400).json({
        message: 'Access Denied!, Only Admin can perform this task'
      })
    }

    try {
      const verified = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      req.user = verified
      next()
    } catch (error) {
      res.status(400).json({
        message: 'Invalid Token'
      })
    }
  }

module.exports = validateToken;