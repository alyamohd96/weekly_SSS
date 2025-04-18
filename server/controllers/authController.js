const User = require('../models/user')

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
        }

        // create user in database
        const user = await User.create({
            name, email, password
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

// export it
module.exports = {
    test,
    registerUser
};