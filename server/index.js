const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))

const app = express()

app.use('/', require('./routes/authRoutes')) // make the app use the endpoint

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))