// import packages
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser } = require('../controllers/authController');


// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

// get request - when you go to '/', it will call the function test. the function test is defined in authController
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)

// export
module.exports = router