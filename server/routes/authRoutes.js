// import packages
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test } = require('../controllers/authController');


// middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://localhost:5173'
    })
)

// get request - when you go to '/', it will call the function test. the function test is defined in authController
router.get('/', test)

// export
module.exports = router