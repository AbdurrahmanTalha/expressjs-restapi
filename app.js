// Basic Lib Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');


// Security Middlewear Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Lib Import
const mongoose = require('mongoose');


// Security Middlewear Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000, // Limit each IP to 3000 requests per `window` (here, per 15 minutes) 
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

// Mongodb Database Connection
let URI = 'mongodb://localhost:27017/Todo';
let OPTION = {
    user: '', 
    pass: '',
    autoIndex:true
}

mongoose.connect(URI, OPTION, (error) => {
    console.log("Connection Success");
    console.log(error);
    
});

// Routing Implement
app.use('/api/v1', router);

// Undefined Route Implement
app.use('*', (req, res) => {
    res.status(404).json({status:"Fail", data:"Not Found"})
    
})


module.exports = app;