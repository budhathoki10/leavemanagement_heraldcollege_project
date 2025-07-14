const express = require('express');
const jwt = require("jsonwebtoken");
const user = require("../schema/user");

require("dotenv").config();

const auth = (req, res, next) => {
    try {
        const head = req.headers.authorization;
        

        if (!head) {
            return res.status(401).json({ message: "Cannot get header" });
        }

        
        const token = head.split(" ")[1]; 
        
   
        const verify = jwt.verify(token, process.env.SECERET_KEY);
        
        if (!verify) {
            return res.status(401).json({ message: "Invalid token" }); 
        }

        req.user = verify;
        next();
    } catch (error) {
       
        return res.status(401).json({ message: "Error in header" });
    }
};
const isteacher = (req, res, next) => {
   
    if (req.user?.role != "teacher") {
        return res.status(403).json({ message: "Teacher access only" });
    }
    next();
};

module.exports = { auth, isteacher };