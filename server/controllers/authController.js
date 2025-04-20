const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// defining the test function that will be called from authRoutes
const test = (req, res) => {
    res.json('test is working')
};

// register user function defined here - POST 
const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        // check if name was entered 
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        };
        // check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'password is required and should be at least 6 characters long'
            })
        };
        // check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        };

        const hashedPassword = await hashPassword(password)
        // create user in database
        const user = await User.create({
            name, email, password: hashedPassword
        });

        return res.json(user);
    } catch (error) {
        console.log(error)
    };
};

// Login endpoint - POST
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check is user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'User does not exist'
            });
        }

        // check if passwords match
        const match = await comparePassword(password, user.password)
        if(match){
            res.json('passwords match');
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match) {
            res.json({
                error: 'Passwords do not match'
            });
        }
    } catch (error) {
        console.log(error)
    };
};


// export it
module.exports = {
    test,
    registerUser,
    loginUser
};