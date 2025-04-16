

// defining the test function that will be called from authRoutes
const test = (req, res) => {
    res.json('test is working')
}

// export it
module.exports = {
    test
}